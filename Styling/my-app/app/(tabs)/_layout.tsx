import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#6750A4",
        tabBarInactiveTintColor: "#938F99",
      }}
    >
      <Tabs.Screen
        name="(todoStack)"
        options={{
          title: "Todos",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name={focused ? "list" : "list-alt"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="completed"
        options={{
          title: "Completed",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name={focused ? "check-circle" : "check-circle-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="edit"
        options={{
          title: "Edit",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="edit" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}