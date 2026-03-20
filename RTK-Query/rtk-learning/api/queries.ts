import { queryClient } from "@/lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    createTodoService,
    fetchTodos,
    updateTodo
} from "./services";

// 🔹 TYPES (Adjust based on your API)
export type Todo = {
    _id: string;
    name: string;
    description: string
    completed: boolean;
};

type UpdateTodoPayload = {
    id: string;
    data: Partial<Todo>;
};


export const useTodos = () =>
    useQuery<Todo[], Error>({
        queryKey: ["todos"],
        queryFn: fetchTodos,
        staleTime: 1000 * 60 * 5,
        retry: 2,
    });


export const useUpdateTodo = () =>
    useMutation({
        mutationFn: ({ id, data }: UpdateTodoPayload) =>
            updateTodo(id, data as { completed: boolean, name: string, description: string }),

        onMutate: async (variables) => {
            await queryClient.cancelQueries({ queryKey: ["todos"] });

            const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

            queryClient.setQueryData<Todo[]>(["todos"], (old) =>
                old?.map((todo) =>
                    todo._id === variables.id
                        ? { ...todo, ...variables.data }
                        : todo
                )
            );

            return { previousTodos };
        },

        onError: (error, variables, context) => {
            if (context?.previousTodos) {
                queryClient.setQueryData(["todos"], context.previousTodos);
            }
            console.error("Update failed:", error);
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

export const useCreateTodo = () => useMutation({
    mutationFn: (todo: { name: string, description: string, completed: boolean }) =>
        createTodoService(todo),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
});


