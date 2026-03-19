import React from "react";
import { View, Text } from "react-native";
import { Controller } from "react-hook-form";
import { Dropdown } from "react-native-element-dropdown";

type Option = {
    label: string;
    value: string;
};

type Props = {
    control: any;
    name: string;
    label: string;
    data: Option[];
    placeholder?: string;
    rules?: any;
    errors: any;
    styles: any;
    disabled?: boolean;
    labelField?: string;
    valueField?: string;
};

export default function FormDropdown({
    control,
    name,
    label,
    data,
    placeholder,
    rules,
    errors,
    styles,
    disabled = false,
    labelField = "label",
    valueField = "value",
}: Props) {
    const hasError = !!errors[name];

    return (
        <View>
            <Text style={styles.label}>{label}</Text>

            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { onChange, value } }) => (
                    <Dropdown
                        style={[
                            styles.dropdown,
                            hasError && styles.dropdownError, // ✅ error style
                            disabled && styles.disabledDropdown, // ✅ disabled style
                        ]}
                        data={data}
                        labelField={labelField}
                        valueField={valueField}
                        placeholder={placeholder}
                        value={value}
                        disable={disabled} // ✅ important
                        onChange={(item) => onChange(item[valueField])}
                    />
                )}
            />

            {hasError && (
                <Text style={styles.errorText}>{errors[name].message}</Text>
            )}
        </View>
    );
}