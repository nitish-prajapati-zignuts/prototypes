import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";



const options:any = {
    headerShown:false,
    headerBackButtonDisplayMode: "default",
}

export default function TasksLayout() {
    return (
        <SafeAreaView style={{flex:1}}>
        <Stack>
            <Stack.Screen name="index" options={{headerShown:false,title:"View Tasks"}}></Stack.Screen>
            <Stack.Screen name="create-task" options={{title:"Add Tasks",headerShown:false,headerBackButtonDisplayMode:"default"}}></Stack.Screen>
            <Stack.Screen name="update-task" options={{headerShown:false,title:"Update Tasks",headerBackButtonDisplayMode:"default"}}></Stack.Screen>
        </Stack>
        </SafeAreaView>
    )
}