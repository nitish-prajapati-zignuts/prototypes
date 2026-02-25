import { Stack } from "expo-router";
import LoginScreen from ".";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        
      }}
      
    >
      <Stack.Screen name="index"  options={{headerShown:false}}/>
      <Stack.Screen name="register" options={{headerShown:false}} />
      <Stack.Screen name="todos" options={{headerShown:false,}} />
    </Stack>
  )
 
}
