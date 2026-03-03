import React from "react";
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  password: string;
};

export default function HomeScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const {t} = useTranslation()

  const onSubmit = (data: FormData) => {
    console.log("Submitted:", data);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#f4f6f8" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <Text numberOfLines={1} style={styles.title}>{t("registration.title")}</Text>

            <FormInput
              control={control}
              name="firstName"
              placeholder={t("registration.placeholders.firstName")}
              error={errors.firstName?.message}
            />

            <FormInput
              control={control}
              name="lastName"
              placeholder={t("registration.placeholders.lastName")}
              error={errors.lastName?.message}
            />

            <FormInput
              control={control}
              name="email"
              placeholder={t("registration.placeholders.email")}
              keyboardType="email-address"
              error={errors.email?.message}
            />

            <FormInput
              control={control}
              name="phone"
              placeholder={t("registration.placeholders.phone")}
              keyboardType="phone-pad"
              error={errors.phone?.message}
            />

            <FormInput
              control={control}
              name="address"
              placeholder={t("registration.placeholders.address")}
              error={errors.address?.message}
            />

            <FormInput
              control={control}
              name="city"
              placeholder={t("registration.placeholders.city")}
              error={errors.city?.message}
            />

            <FormInput
              control={control}
              name="password"
              placeholder={t("registration.placeholders.password")}
              secureTextEntry
              error={errors.password?.message}
            />

            <View style={{ marginTop: 25 }}>
              <Button title="Submit" onPress={handleSubmit(onSubmit)} />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

interface InputProps {
  control: any;
  name: keyof FormData;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: any;
  error?: string;
}

const FormInput = ({
  control,
  name,
  placeholder,
  secureTextEntry,
  keyboardType,
  error,
}: InputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: `${placeholder} is required` }}
      render={({ field: { onChange, onBlur, value } }) => (
        <View style={{ marginBottom: 18 }}>
          <TextInput
            style={[styles.input, error && styles.errorInput]}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            returnKeyType="next"
            placeholderTextColor="#999"
          />
          {error && <Text style={styles.error}>{error}</Text>}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    flexGrow: 1,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 25,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  errorInput: {
    borderColor: "#ff4d4f",
  },
  error: {
    color: "#ff4d4f",
    marginTop: 6,
    fontSize: 13,
  },
});