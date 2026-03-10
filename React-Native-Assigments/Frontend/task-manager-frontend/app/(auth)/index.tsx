import { AuthStyles } from "@/styles/AuthStyles";
import { router } from "expo-router";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Login Data:", data);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={AuthStyles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ width: "100%", alignItems: "center" }}>
            
            <Text style={AuthStyles.title}>Welcome to Task Manager</Text>
            <Text style={AuthStyles.subtitle}>Login to continue</Text>

            {/* Email */}
            <Controller
              control={control}
              name="email"
              rules={{ required: "Email is required" }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={AuthStyles.input}
                  placeholder="Email"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.email && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {errors.email.message}
              </Text>
            )}

            {/* Password */}
            <Controller
              control={control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={AuthStyles.input}
                  placeholder="Password"
                  secureTextEntry
                  placeholderTextColor="#999"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.password && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {errors.password.message}
              </Text>
            )}

            <TouchableOpacity
              style={AuthStyles.button}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={AuthStyles.buttonText}>Login</Text>
            </TouchableOpacity>

            <Text
              onPress={() => router.push("/register")}
              style={AuthStyles.footerText}
            >
              Don't have an account?{" "}
              <Text style={AuthStyles.linkText}>Register</Text>
            </Text>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}