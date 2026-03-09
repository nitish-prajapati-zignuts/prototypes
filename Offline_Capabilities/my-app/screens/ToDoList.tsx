import { FlatList, View } from "react-native";
import { Todo } from "../types/Todo";
import ToDoItem from "./TodoItem";

interface TodoListProps {
    toDos:Todo[]
    onCompleteToDo : (toDoId:string) => void
}

const ToDoList = ({ toDos, onCompleteToDo }: TodoListProps) => {
  return (
    <View>
      <FlatList
        data={toDos}
        renderItem={({ item }) => (
          <ToDoItem toDo={item} onComplete={onCompleteToDo} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ToDoList;