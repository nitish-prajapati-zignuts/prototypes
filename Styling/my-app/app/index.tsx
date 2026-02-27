import { loginStyles } from '@/styles/AuthStyle';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';

export default function LoginScreen() {
  const user = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const { status,canAskAgain } = await Location.requestForegroundPermissionsAsync();
        

        if (status !== 'granted') {
          console.log('Permission denied');
          Alert.alert('Location Permission Required','Please enable location access in Settings',[{
            text:'Cancel',style:'cancel'
          },{
            text:'Open Settings',
            onPress:() => Linking.openSettings()
          }])
          return;
        }

        if(!canAskAgain){
             console.log('Permission denied');
          Alert.alert('Location Permission Required','Please enable location access in Settings',[{
            text:'Cancel',style:'cancel'
          },{
            text:'Open Settings',
            onPress:() => Linking.openSettings()
          }])
          return;
        }

        

        const enabled = await Location.hasServicesEnabledAsync();

        if (!enabled) {
         Alert.alert('Location Services Disabled','Please enable Location Service in your device settings.')
          return;
        }

        //TODO
        //Storing Location into the Store
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        console.log('Location:', location);
      } catch (error) {
        console.log('Location error:', error);
      }
    };

    fetchPermissions();
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!username || !password) {
      setError('Please Enter the Required Details.');
      return
    }
    setLoading(true);
    const response = await fetch(
      'https://unvolcanic-alfonzo-nonverminous.ngrok-free.dev/api/login',
      {
        method: 'POST',
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      },
    );

    const result = await response.json();

    console.log(result);
    setLoading(false);

    if (response.ok) {
      router.replace('/todos');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={loginStyles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={loginStyles.card}>
              <Text style={loginStyles.title}>Login</Text>

              <Text style={loginStyles.label}>Enter your email</Text>
              <TextInput
                style={loginStyles.input}
                placeholder="Enter your email"
                placeholderTextColor="#888"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
                onChangeText={(text) => setUsername(text)}
              />

              <Text style={loginStyles.label}>Enter your password</Text>
              <TextInput
                style={loginStyles.input}
                placeholder="Enter your password"
                placeholderTextColor="#888"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
                onChangeText={(text) => setPassword(text)}
              />
              {error ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 12,
                  }}
                >
                  <Text style={[loginStyles.error, { textAlign: 'center' }]}>
                    {error}
                  </Text>
                </View>
              ) : null}
              <View style={{ marginTop: 5 }}>
                <TouchableOpacity
                  disabled={isLoading}
                  onPress={handleSubmit}
                  style={loginStyles.button}
                  activeOpacity={0.5}
                >
                  {!isLoading ? (
                    <Text style={loginStyles.buttonText}>Login</Text>
                  ) : (
                    <ActivityIndicator size="small" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => router.replace('/register')}
                  style={loginStyles.button}
                  activeOpacity={0.8}
                >
                  <Text style={loginStyles.buttonText}>
                    Don't have an Account? Register
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
