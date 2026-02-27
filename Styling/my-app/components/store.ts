import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async (data:any) => {
    await AsyncStorage.setItem("user",data)
}

export const getItem = () => {
    return AsyncStorage.getItem("user")
}

