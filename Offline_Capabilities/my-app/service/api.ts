import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { AddTodoInput, AddTodoWithIdInput, PagedToDos, Todo } from "../types/Todo";
import uuid from 'react-native-uuid'


const REACT_APP_API_URL = "https://unvolcanic-alfonzo-nonverminous.ngrok-free.dev"

const apiFetch = async (endpoint:string,options?:RequestInit) => {
    const response = await fetch(`${REACT_APP_API_URL}${endpoint}`,{
        headers:{'Content-Type':'application/json'},
        ...options
    });

    console.log(response)

    if(!response.ok){
        throw new Error('Network response was not ok');
    }

    return response.json();
}

export const useTodosQuery = () => {
    return useQuery({
        queryKey:['todos'],
        queryFn:() => apiFetch("/todos")
    })
};

export const useCompleteTodo = (queryClient: QueryClient) => {
  return useMutation({
    mutationKey: ["completeTodo"],
    mutationFn: (toDoId: string) => apiFetch(`/todos/${toDoId}/complete`, { method: 'PATCH' }),
    onMutate: async (toDoId) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousToDos = queryClient.getQueryData<PagedToDos>(["todos"]);

      queryClient.setQueryData<PagedToDos>(["todos"], (old) => ({
        items: old?.items.map((item) => 
          item.id === toDoId ? { ...item, completed: true } : item
        ) || [],
      }));

      return { previousToDos };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["todos"], context?.previousToDos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useAddTodo = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (body: AddTodoInput) => apiFetch("/todos", { 
        method: 'POST', 
        body: JSON.stringify(body) 
    }),
    onMutate: async (addedToDo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousToDos = queryClient.getQueryData<PagedToDos>(["todos"]);

      queryClient.setQueryData<PagedToDos>(["todos"], (old) => ({
        items: [...(old?.items || []), {
          ...addedToDo,
          completed: false,
          id: uuid.v4().toString(),
        }],
      }));
      return { previousToDos };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["todos"], context?.previousToDos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useAddTodoWithId = (queryClient: QueryClient) => {
  return useMutation({
    mutationKey: ["addTodoWithId"],
    mutationFn: (body: AddTodoWithIdInput) => apiFetch("/todos/with-id", {
        method: 'POST',
        body: JSON.stringify(body)
    }),
    onMutate: async (addedToDo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousToDos = queryClient.getQueryData<PagedToDos>(["todos"]);

      queryClient.setQueryData<PagedToDos>(["todos"], (old) => ({
        items: [...(old?.items || []), { ...addedToDo, completed: false }],
      }));

      return { previousToDos };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["todos"], context?.previousToDos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const completeTodoMutationFn = async (toDoId: string): Promise<Todo> => {
  return apiFetch(`/todos/${toDoId}/complete`, { method: "PATCH" });
};

export const addTodoWithIdMutationFn = async ({
  id,
  name,
  description,
}: AddTodoWithIdInput): Promise<Todo> => {
  return apiFetch("/todos/with-id", {
    method: "POST",
    body: JSON.stringify({ id, name, description }),
  });
};

