import { Drawer } from "expo-router/drawer";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { router, usePathname } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

function CustomDrawerContent() {
  const pathname = usePathname();

  const DrawerItem = ({ label, icon, route }:any) => {
    const isActive = pathname.startsWith(route);

    return (
      <Pressable
        onPress={() => {
          router.push(route);
        }}
        style={[styles.item, isActive && styles.activeItem]}
      >
        <MaterialIcons
          name={icon}
          size={22}
          color={isActive ? "#6750A4" : "#444"}
        />
        <Text style={[styles.label, isActive && styles.activeLabel]}>
          {label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My App</Text>

      <DrawerItem
        label="All Todos"
        icon="list"
        route="/(tabs)/(todoStack)/todos"
      />

      <DrawerItem
        label="Edit (Tab)"
        icon="edit"
        route="/(tabs)/edit"
      />
    </View>
  );
}

export default function TodoDrawerLayout() {
  return (
    <Drawer
      drawerContent={() => <CustomDrawerContent />}
      screenOptions={{
        headerTitle: "",
        headerShadowVisible: false,
      }}
    >
      <Drawer.Screen
        name="todos"
        options={{ title: "All Todos" }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#F8F5FF",
  },
  header: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 30,
    color: "#1C1B1F",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 8,
  },
  activeItem: {
    backgroundColor: "#EADDFF",
  },
  label: {
    marginLeft: 14,
    fontSize: 16,
    color: "#1C1B1F",
  },
  activeLabel: {
    color: "#6750A4",
    fontWeight: "600",
  },
});