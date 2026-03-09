import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { addTodoWithIdMutationFn, completeTodoMutationFn } from "./service/api";

import { RootStackParamList } from "./types/navigation";
import AddToDoScreen from "./screens/AddTodoScreen";
import ToDoListScreen from "./screens/TodoListScreen";
import { AddTodoWithIdInput } from "./types/Todo";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, 
      staleTime: 2000,
      retry: 0,
      networkMode:"offlineFirst"
    },
    mutations:{
      networkMode:"offlineFirst"
    }
  },
});

queryClient.setMutationDefaults(["addTodoWithId"], {
  mutationFn: (variables: AddTodoWithIdInput) => addTodoWithIdMutationFn(variables),
  networkMode:"offlineFirst"
});

queryClient.setMutationDefaults(["completeTodo"], {
  mutationFn: (id: string) => completeTodoMutationFn(id),
  networkMode:"offlineFirst"
});
const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  throttleTime: 1000
});

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
      onSuccess={() => {
        console.log("PersistQueryClientProvider.onSuccess");
        queryClient
          .resumePausedMutations()
          .then(() => queryClient.invalidateQueries());
      }}
    >
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            contentStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        >
          <Stack.Screen name="TodoList" component={ToDoListScreen} />
          <Stack.Screen name="AddTodo" component={AddToDoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PersistQueryClientProvider>
  );
}