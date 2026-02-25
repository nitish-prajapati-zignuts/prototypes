import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SingleViewTodo(){
    return (
       <SafeAreaView>
        <View>
            <Text>Hi</Text>
        </View>
       </SafeAreaView>
    )
}