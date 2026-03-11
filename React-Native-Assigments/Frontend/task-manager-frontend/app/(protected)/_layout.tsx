import { Redirect, Stack, usePathname, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function ProtectedLayout() {
    const segments = useSegments()
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount((prev) => prev + 1);
        console.log("Count:", count);
        console.log("Protected Logs")
    }, [segments]);

    return <Stack screenOptions={{headerShown:false}} />;
}