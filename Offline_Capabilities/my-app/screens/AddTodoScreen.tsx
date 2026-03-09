import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import AddToDoForm from "../components/AddTodoForm";
import { useQueryClient } from "@tanstack/react-query";
import { useAddTodoWithId } from "../service/api";
import uuid from 'react-native-uuid'

type AddToDoScreenProps = NativeStackScreenProps<RootStackParamList,"AddTodo">;
const AddToDoScreen = ({ navigation }: AddToDoScreenProps) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const queryClient = useQueryClient()
  const {mutate} = useAddTodoWithId(queryClient)

  useEffect(() => {
    navigation.setOptions({
      title: "ToDo List",
      headerRight: () => (
        <Button
          title="Done"
          onPress={() => {
            mutate({id:uuid.v4().toString(),name,description})
            console.log("Mutating Changes")
            navigation.navigate("TodoList");
          }}
        />
      ),
    });
  }, [navigation, name, description]);

  return (
    <View>
      <AddToDoForm
        name={name}
        onChangeName={setName}
        description={description}
        onChangeDescription={setDescription}
      />
    </View>
  );
};

export default AddToDoScreen;
 