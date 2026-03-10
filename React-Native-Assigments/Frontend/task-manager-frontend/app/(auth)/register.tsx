import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { AuthStyles } from "@/styles/AuthStyles";

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function Register() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
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
          keyboardDismissMode="on-drag"
        >
          <View style={{ width: "100%", alignItems: "center" }}>

            <Text style={AuthStyles.title}>Create Account</Text>
            <Text style={AuthStyles.subtitle}>Register to get started</Text>

            {/* Name */}
            <Controller
              control={control}
              name="name"
              rules={{ required: "Name is required" }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={AuthStyles.input}
                  placeholder="Full Name"
                  placeholderTextColor="#999"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />

            {errors.name && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {errors.name.message}
              </Text>
            )}

            {/* Email */}
            <Controller
              control={control}
              name="email"
              rules={{ required: "Email is required" }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={AuthStyles.input}
                  placeholder="Email"
                  keyboardType="email-address"
                  placeholderTextColor="#999"
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
              rules={{ required: "Password is required", minLength: 6 }}
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
              <Text style={AuthStyles.buttonText}>Register</Text>
            </TouchableOpacity>

            <Text style={AuthStyles.footerText}>
              Already have an account?{" "}
              <Text style={AuthStyles.linkText}>Login</Text>
            </Text>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}