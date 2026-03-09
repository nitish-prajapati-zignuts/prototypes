import { Button, StyleSheet, Text, View } from "react-native";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
// import ToDoList from "../components/ToDoList";
import { StatusBar } from "expo-status-bar";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { PagedToDos } from "../types/Todo";
import ToDoList from "./ToDoList";
import { useQueryClient } from "@tanstack/react-query";
import { useCompleteTodo, useTodosQuery } from "../service/api";
import OfflineSimulator from "../components/OfflineSimulator";

type ToDoListScreenProps = NativeStackScreenProps<RootStackParamList,"TodoList">;

const ToDoListScreen = ({ navigation }: ToDoListScreenProps) => {
//   const data = useMemo<PagedToDos>(
//     () => ({
//       items: [
//         {
//           id: "1",
//           name: "ToDo 1",
//           description:
//             "ToDo 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at varius diam",
//           completed: false,
//         },
//         {
//           id: "2",
//           name: "ToDo 2",
//           description:
//             "ToDo 2: Aliquam a mattis sapien. Nullam pretium imperdiet nulla sit amet scelerisque",
//           completed: false,
//         },
//         {
//           id: "3",
//           name: "ToDo 3",
//           description:
//             "ToDo 3: Proin viverra cursus diam, quis cursus nunc gravida sed.",
//           completed: false,
//         },
//       ],
//     }),
//     []
//   );
  useEffect(() => {
    navigation.setOptions({
      title: "List",
      headerRight: () => (
        <Button title="Add" onPress={() => navigation.navigate("AddTodo")} />
      ),
    });
  }, [navigation]);

  const queryClient = useQueryClient();
  const {mutate} = useCompleteTodo(queryClient)

  const handleCompleteToDo = (toDoId: string) => mutate(toDoId);
  const {data,isLoading,isError,error,isSuccess} = useTodosQuery()
  console.log(error)

  return (
    <View style={styles.container}>
      <OfflineSimulator />
      <View style={styles.list}>
        {isError && <Text>Error</Text>}
        {isLoading && <Text>Loading..</Text>}
        {isSuccess && (
          <ToDoList toDos={data.items} onCompleteToDo={handleCompleteToDo} />
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default ToDoListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: "black",
    fontSize: 24,
    fontWeight: "500",
    marginTop: 0,
    marginBottom: 24,
    borderColor: "green",
    borderWidth: 1,
  },
  list: {
    flex: 1,
  },
});