import { Stack } from "expo-router";
import LoginScreen from ".";
import { useEffect } from "react";
import * as Notifications from 'expo-notifications'
import { Alert, Platform } from "react-native";
import Constants from "expo-constants"
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner:true,
    shouldShowList:true
  }),
});

export default function RootLayout() {
  useEffect(() => {
    registerForPushNotificationAsync();
  },[])

  async function registerForPushNotificationAsync(){
      //Check existing Status
      const {status:existingStatus} = await Notifications.getPermissionsAsync();
      
      let finalStatus;
      if(existingStatus !== 'granted'){
        const {status} = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }

       if (finalStatus !== "granted") {
      Alert.alert(
        "Permission required",
        "Push notification permission denied"
      );
      return;
    }

    //Android Channel Setup

     const token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId,
      })
    ).data;

    if(Platform.OS === 'android'){
      await Notifications.setNotificationChannelAsync("default",{
        name:"default",
        importance:Notifications.AndroidImportance.MAX
      })
    }

    return token;

  }
  return (
    <Stack
      screenOptions={{
        headerShown:false
      }}
      
    >
      <Stack.Screen name="index"  options={{headerShown:false}}/>
      <Stack.Screen name="register" options={{headerShown:false}} />
      <Stack.Screen name="(tabs)" options={{headerShown:false,}} />
    </Stack>
  )
 
}
