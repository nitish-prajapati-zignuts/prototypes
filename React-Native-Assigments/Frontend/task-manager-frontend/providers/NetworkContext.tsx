import React, {
    createContext,
    useEffect,
    useRef,
    useState,
    ReactNode,
} from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";


interface NetworkContextType {
    isConnected: boolean;
}

export const NetworkContext = createContext<NetworkContextType>({
    isConnected: true,
});

interface Props {
    children: ReactNode;
}

type BannerState = "offline" | "online" | "hidden";

export const NetworkProvider = ({ children }: Props) => {
    const [isConnected, setIsConnected] = useState<boolean>(true);
    const [bannerState, setBannerState] = useState<BannerState>("hidden");

    const slideAnim = useRef(new Animated.Value(-60)).current;
    const hideTimeout = useRef<number | null>(null);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            const connected = !!state.isConnected;

            if (!connected) {
                setBannerState("offline");
                animateIn();
            }

            if (connected && !isConnected) {
                setBannerState("online");
                animateIn();

                if (hideTimeout.current) {
                    clearTimeout(hideTimeout.current);
                }

                hideTimeout.current = setTimeout(() => {
                    animateOut();
                }, 2000);
            }

            setIsConnected(connected);
        });

        return () => unsubscribe();
    }, [isConnected]);

    const animateIn = () => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const animateOut = () => {
        Animated.timing(slideAnim, {
            toValue: -60,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setBannerState("hidden");
        });
    };

    const backgroundColor =
        bannerState === "offline"
            ? "#d9534f"
            : bannerState === "online"
                ? "#28a745"
                : "transparent";

    const message =
        bannerState === "offline"
            ? "No Internet Connection"
            : bannerState === "online"
                ? "Back Online"
                : "";

    return (
        <NetworkContext.Provider value={{ isConnected }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <View style={{ flex: 1, backgroundColor: Colors.white }}>
                    {bannerState !== "hidden" && (
                        <Animated.View
                            style={[
                                styles.banner,
                                {
                                    backgroundColor,
                                    transform: [{ translateY: slideAnim }],
                                },
                            ]}
                        >
                            <Text style={styles.bannerText}>{message}</Text>
                        </Animated.View>
                    )}

                    {children}
                </View>
            </SafeAreaView>
        </NetworkContext.Provider>
    );
};

const styles = StyleSheet.create({
    banner: {
        position: "absolute",
        top: 0,
        width: "100%",
        paddingVertical: 10,
        zIndex: 1000,
        elevation: 10,
    },
    bannerText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "600",
    },
});