import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { Controller } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";

type Props = {
    control: any;
    name: string;
    label: string;
    rules?: any;
    styles: any;
    editable?: boolean;
};

export default function DatePickerField({
    control,
    name,
    label,
    rules,
    styles,
    editable = true,
}: Props) {
    const [show, setShow] = useState(false);

    return (
        <View>
            <Text style={styles.label}>{label}</Text>

            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { onChange, value } }) => {
                    const hasError = false;

                    return (
                        <>
                            <TouchableOpacity
                                style={[
                                    styles.input,
                                    { justifyContent: "center" },
                                    !editable && styles.disabledInput,
                                    hasError && styles.inputError,
                                ]}
                                onPress={() => editable && setShow(true)}
                                disabled={!editable}
                            >
                                <Text style={{ color: value ? "#1A1A1A" : "#999" }}>
                                    {value || "Select Date"}
                                </Text>
                            </TouchableOpacity>

                            {show && (
                                <DateTimePicker
                                    value={value ? new Date(value) : new Date()}
                                    mode="date"
                                    display={Platform.OS === "ios" ? "spinner" : "default"}
                                    onChange={(event, selectedDate) => {
                                        if (Platform.OS === "android") {
                                            setShow(false);
                                        }

                                        if (event.type === "set" && selectedDate) {
                                            const formatted = selectedDate
                                                .toISOString()
                                                .split("T")[0];

                                            onChange(formatted);

                                            if (Platform.OS === "ios") {
                                                setShow(false);
                                            }
                                        } else {
                                            setShow(false);
                                        }
                                    }}
                                />
                            )}
                        </>
                    );
                }}
            />
        </View>
    );
}