import React from "react";
import { View, Text, TextInput } from "react-native";
import { Controller } from "react-hook-form";

type Props = {
    control: any;
    name: string;
    label: string;
    placeholder?: string;
    rules?: any;
    errors: any;
    multiline?: boolean;
    numberOfLines?: number;
    styles: any;
    editable?: boolean;
};

export default function FormInput({
    control,
    name,
    label,
    placeholder,
    rules,
    errors,
    multiline,
    numberOfLines,
    styles,
    editable = true, // ✅ default true
}: Props) {
    return (
        <View>
            <Text style={styles.label}>{label}</Text>

            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        placeholder={placeholder}
                        style={[
                            styles.input,
                            multiline && styles.textArea,
                            !editable && styles.disabledInput, 
                        ]}
                        value={value}
                        onChangeText={onChange}
                        placeholderTextColor="#999"
                        multiline={multiline}
                        numberOfLines={numberOfLines}
                        editable={editable} 
                    />
                )}
            />

            {errors[name] && (
                <Text style={styles.error}>{errors[name].message}</Text>
            )}
        </View>
    );
}