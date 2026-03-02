import { useLoginStyles } from "@/styles/AuthStyle";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Linking,
  GestureResponderEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { useAuth } from "@/store/AuthContext/AuthContext";
import useResponsive from "@/hooks/useResponsive";
import { useAuthStore } from "@/zustand/useAuthStore";
import { useAuthRecoilState } from "@/Recoil/Actions";

export default function LoginScreen() {
  const responsive = useResponsive();
  const styles = useLoginStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  //const login = useAuthStore((state:any) => state.login)
  //const {login} = useAuthRecoilState()
  const bannerWidth = responsive.wp(80);
  const bannerHeight = responsive.getARHeight(bannerWidth, 16 / 9);
  const {login} = useAuth()
  const handleSubmit = async () => {
    if (!username || !password) {
      setError("Please Enter the Required Details.")
      return
    }
    setLoading(true)
    const response = await fetch(
      'https://unvolcanic-alfonzo-nonverminous.ngrok-free.dev/api/login',
      {
        method:"POST",
        body:JSON.stringify({
          email:username,
          password:password
        })
      },
    );

    const result = await response.json()

    console.log(result)
    setLoading(false)
    if(response.ok){
      //login(result.data,"auth-token")
      //Recoil Data 
      login(result.data)
      router.replace("/todos")
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EAEFEF" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.card}>
           
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Sign in to continue</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="name@example.com"
                  placeholderTextColor="#AAA"
                  onChangeText={setUsername}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  secureTextEntry
                  onChangeText={setPassword}
                />
              </View>

              {error ? <Text style={styles.error}>{error}</Text> : null}

              <TouchableOpacity
                disabled={isLoading}
                onPress={handleSubmit}
                style={styles.button}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Login</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.replace("/register")}
                style={styles.button}
              >
                <Text style={styles.buttonText}>
                  Don't have an account? <Text style={{ color: 'white' }}>Register</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}