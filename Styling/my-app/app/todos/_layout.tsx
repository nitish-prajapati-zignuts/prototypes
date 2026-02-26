import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

export default function TodosLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen
        name="(todoStack)"
        options={{
          title: "Todos",
          headerShown:false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="list" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="completed"
        options={{
          title: "Completed",
          
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="check-circle" size={size} color={color} />
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