import { Stack } from "expo-router";

export default function TodosStackLayout() {
  return <Stack screenOptions={{headerShown:true}}>
    <Stack.Screen name="[id]" options={{headerTitle:"Fetching Todo"}}>
      
    </Stack.Screen>
    <Stack.Screen name="index" options={{headerTitle:"Todo's"}}>

    </Stack.Screen>
  </Stack>;
}