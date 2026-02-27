import { MaterialIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import {Drawer} from "expo-router/drawer"


export default function TodosStackLayout() {
  return <Stack screenOptions={{headerShown:false,headerBackButtonDisplayMode:"minimal"}}>
    <Stack.Screen name="[id]" options={({navigation}) => ({
      headerLeft: () => (
        <MaterialIcons 
            name="arrow-back"
            size={24}
            onPress={() => navigation.goBack()}
        />
      )
    })}>
      
    </Stack.Screen>
    <Stack.Screen name="index" options={{headerTitle:"Todo's"}}>

    </Stack.Screen>
  </Stack>;
}