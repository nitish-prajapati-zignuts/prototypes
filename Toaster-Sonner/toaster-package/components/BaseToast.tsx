import { Colors } from "@/config/theme";
import { SCALE } from "@/utils/helpers";
import React, { useEffect } from "react";
import { Animated, DimensionValue, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";

const loadIconFamily = (familyName: string) => {
    try {
        switch (familyName) {
            case 'Ionicons':
                return require('react-native-vector-icons/Ionicons').default;
            case 'MaterialIcons':
                return require('react-native-vector-icons/MaterialIcons').default;
            case 'FontAwesome':
                return require('react-native-vector-icons/FontAwesome').default;
            case 'FontAwesome5':
                return require('react-native-vector-icons/FontAwesome5').default;
            case 'MaterialCommunityIcons':
                return require('react-native-vector-icons/MaterialCommunityIcons').default;
            case 'Entypo':
                return require('react-native-vector-icons/Entypo').default;
            case 'Feather':
                return require('react-native-vector-icons/Feather').default;
            case 'AntDesign':
                return require('react-native-vector-icons/AntDesign').default;
            case 'Octicons':
                return require('react-native-vector-icons/Octicons').default;
            case 'SimpleLineIcons':
                return require('react-native-vector-icons/SimpleLineIcons').default;
            default:
                throw new Error(`Icon family ${familyName} not found`);
        }
    } catch (error) {
        console.warn(`Icon family ${familyName} not found. Please install react-native-vector-icons or use custom icons.`);
        return null;
    }
};

const IconFamilies = [
    'Ionicons',
    'MaterialIcons',
    'FontAwesome',
    'FontAwesome5',
    'MaterialCommunityIcons',
    'Entypo',
    'Feather',
    'AntDesign',
    'Octicons',
    'SimpleLineIcons',
] as const

interface BaseToastProps {
    iconFamily?: typeof IconFamilies[number] | string;
    icon?: string | React.ReactNode;
    text1?: string
    text2?: string
    message?: string
    onPress?: () => void
    hide?: () => void
    backgroundColor?: string
    textColor?: string
    borderColor?: string
    iconSize?: number;
    iconColor?: string;
    showProgressBar?: boolean
    progressBarColor?: string
    barWidth?: Animated.Value;
    isRTL?: boolean
    showCloseIcon?: boolean
    duration?: number
    testID?: string
    width?: number | string
    minHeight?: number | string
    style?: StyleProp<ViewStyle>
    theme: 'light' | 'dark'
    closeIcon?: string | React.ReactNode
    closeIconStyle?: StyleProp<ViewStyle>
    closeIconColor?: string
    closeIconSize?: number
    closeIconFamily?: typeof IconFamilies[number] | string
}

const BaseToast = ({
    icon = 'checkmark-circle',
    iconFamily = 'Ionicons',
    message,
    text1,
    text2,
    onPress,
    hide,
    backgroundColor,
    textColor,
    iconColor = Colors.success,
    iconSize = SCALE(22),
    showProgressBar = true,
    progressBarColor,
    barWidth: externalBarWidth,
    isRTL = false,
    showCloseIcon = true,
    duration = 3000,
    testID = 'toast-base',
    width,
    minHeight,
    style,
    theme = 'light',
    closeIcon = 'close-outline',
    closeIconSize = SCALE(22),
    closeIconColor,
    closeIconFamily = 'Ionicons',
}: BaseToastProps) => {

    //Use local animated value if no external one is provided
    const localBarWidth = React.useRef(new Animated.Value(100)).current;
    const barWidth = externalBarWidth || localBarWidth

    //Set Background and Text Color based on theme if not expilicity provided
    const bgColor = backgroundColor || (theme === 'light' ? Colors.white : Colors.black);
    const txtColor = textColor || (theme === 'light' ? Colors.black : Colors.white);

    useEffect(() => {
        if (showProgressBar && !externalBarWidth) {

            localBarWidth.setValue(isRTL ? 0 : 100)

            Animated.timing(localBarWidth, {
                toValue: isRTL ? 100 : 0,
                duration: duration,
                useNativeDriver: false,
            }).start();
        }
    }, [showProgressBar, externalBarWidth, duration, isRTL, localBarWidth])

    const rtlContentStyle: ViewStyle = {
        flexDirection: isRTL ? 'row-reverse' : 'row',
    }; const rtlHideButtonStyle = isRTL ? { right: undefined, left: SCALE(3.2) } : {}
    const rtlIconWrapperStyle = isRTL ? { marginRight: 0, marginLeft: SCALE(8) } : {}
    const rtlTextStyle = isRTL ? { textAlign: 'right' as 'right' } : {}

    //Adjust Margin based on RTL
    const textMarginStyle = isRTL ? { marginLeft: SCALE(25), marginRight: 0 } : { marginRight: SCALE(25), marginLeft: 0 }

    const containerStyle = [
        styles.container,
        { backgroundColor: bgColor },
        width !== undefined && { width: width as DimensionValue },
        minHeight !== undefined && { minHeight: minHeight as DimensionValue },
        // Add shadow color based on theme
        {
            shadowColor: theme === 'dark' ? "#fff" : "#000",
            elevation: theme === 'dark' ? 8 : 5, // Slightly higher elevation for dark theme for better visibility
        },
        style
    ].filter(Boolean);

    const renderIcon = () => {
        if (React.isValidElement(icon)) {
            return (
                <View style={[styles.iconWrapper, rtlIconWrapperStyle]} testID={`${testID}-custom-icon`}>
                    {icon}
                </View>
            )
        }

        if (typeof icon === 'string') {
            // Dynamically load the icon component for the specified family
            const IconComponent = loadIconFamily(iconFamily);

            // If icon component couldn't be loaded, show a fallback or nothing
            if (!IconComponent) {
                return (
                    <View
                        style={[styles.iconWrapper, rtlIconWrapperStyle, styles.iconFallback]}
                        testID={`${testID}-icon-fallback`}
                    >
                        <Text style={{ color: iconColor, fontSize: iconSize, marginTop: -SCALE(2) }}>!</Text>
                    </View>
                );


            }

            return (
                <IconComponent
                    name={icon}
                    size={iconSize}
                    color={iconColor}
                    style={[styles.iconWrapper, rtlIconWrapperStyle]}
                    testID={`${testID}-icon`}
                />
            )

        }

        return null
    }

    // If icon is a string, render the appropriate icon from the specified family



    const renderCloseIcon = () => {
        const finalCloseIconColor = closeIconColor || (theme === 'light' ? Colors.black : Colors.white)

        if (React.isValidElement(closeIcon)) {
            return closeIcon
        }

        if (typeof closeIcon === 'string') {
            const CloseIconComponent = loadIconFamily(closeIconFamily)

            if (!CloseIconComponent) {
                return (
                    <View style={styles.closeFallback}>
                        <Text style={{ color: finalCloseIconColor, fontSize: closeIconSize }}>×</Text>
                    </View>
                )
            }

            return (
                <CloseIconComponent
                    name={closeIcon}
                    size={closeIconSize}
                    color={finalCloseIconColor}
                />
            )
        }

        //Fallback Close Icon
        const DefaultCloseIconComponent = loadIconFamily('Ionicons')

        if (!DefaultCloseIconComponent) {
            return (
                <View style={styles.closeFallback}>
                    <Text style={{ color: finalCloseIconColor, fontSize: closeIconSize }}>×</Text>
                </View>
            )
        }

        return (
            <DefaultCloseIconComponent
                name="close-outline"
                size={closeIconSize}
                color={finalCloseIconColor}
            />
        )
    }

    return (
        <View
            style={containerStyle}
            testID={testID}
        >
            {showCloseIcon && (
                <TouchableOpacity
                    style={[styles.hideButton, rtlHideButtonStyle]}
                    onPress={hide}
                    activeOpacity={0.7}
                    testID={`${testID}-close-button`}
                >
                    {renderCloseIcon()}
                </TouchableOpacity>
            )}

            <View style={styles.content} testID={`${testID}-content`}>
                <View style={[styles.contentInner, rtlContentStyle]}>
                    {renderIcon()}
                    <View style={{ flex: 1 }} testID={`${testID}-text-container`}>
                        {text1 ? (
                            <Text
                                allowFontScaling={false}
                                style={[styles.text1, { color: txtColor }, rtlTextStyle, textMarginStyle]}
                                testID={`${testID}-text1`}
                            >
                                {text1}
                            </Text>
                        ) : null}
                        {text2 ? (
                            <Text
                                allowFontScaling={false}
                                style={[styles.text2, { color: txtColor }, rtlTextStyle, textMarginStyle]}
                                testID={`${testID}-text2`}
                            >
                                {text2}
                            </Text>
                        ) : null}
                    </View>
                </View>
            </View>

            {showProgressBar && (
                <View
                    style={styles.progressBarContainer}
                    testID={`${testID}-progress-container`}
                >
                    {isRTL ? (
                        // For RTL: Start from left (0%) and grow to right (100%)
                        <Animated.View
                            testID={`${testID}-progress-bar`}
                            style={{
                                position: 'absolute',
                                left: 0,
                                width: barWidth.interpolate({
                                    inputRange: [0, 100],
                                    outputRange: ['0%', '100%']
                                }),
                                backgroundColor: progressBarColor || iconColor,
                                height: '100%'
                            }}
                        />
                    ) : (
                        // For LTR: Start from left (100%) and shrink to left (0%)
                        <Animated.View
                            testID={`${testID}-progress-bar`}
                            style={{
                                width: barWidth.interpolate({
                                    inputRange: [0, 100],
                                    outputRange: ['0%', '100%']
                                }),
                                backgroundColor: progressBarColor || iconColor,
                                height: '100%'
                            }}
                        />
                    )}
                </View>
            )}
        </View>
    );
};

export default BaseToast

const styles = StyleSheet.create({
    container: {
        width: '90%',
        minHeight: SCALE(61),
        borderRadius: 8,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    hideButton: {
        position: "absolute",
        top: SCALE(3.2),
        right: SCALE(3.2),
        zIndex: 9999999,
    },
    content: {
        width: '100%',
    },
    contentInner: {
        paddingHorizontal: SCALE(12),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    iconWrapper: {
        marginRight: SCALE(8),
    },
    iconFallback: {
        width: SCALE(22),
        height: SCALE(22),
        borderRadius: SCALE(11),
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeFallback: {
        width: SCALE(22),
        height: SCALE(22),
        alignItems: 'center',
        justifyContent: 'center',
    },
    text1: {
        fontSize: SCALE(14),
        fontWeight: "500",
    },
    text2: {
        fontSize: SCALE(12),
        fontWeight: "400",
        marginTop: SCALE(4),
        opacity: 0.8,
    },
    progressBarContainer: {
        flexDirection: "row",
        position: "absolute",
        height: 4,
        width: "100%",
        bottom: 0,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        overflow: 'hidden',
    },
});

