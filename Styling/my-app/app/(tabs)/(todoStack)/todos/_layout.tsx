import { Stack } from "expo-router";


export default function TodosStackLayout() {
  return <Stack screenOptions={{headerShown:false,headerBackButtonDisplayMode:"minimal"}}>
    <Stack.Screen name="[id]" options={{headerTitle:"Todo's"}}>
      
    </Stack.Screen>
    <Stack.Screen name="index" options={{headerTitle:"Todo's"}}>

    </Stack.Screen>
  </Stack>;
}