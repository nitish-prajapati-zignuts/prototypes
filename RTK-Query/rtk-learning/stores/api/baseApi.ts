import { Todo } from "@/api/queries";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://unfeared-rana-prerheumatic.ngrok-free.dev",
    }),
    tagTypes: ["Todos"],
    endpoints: (builder) => ({
        getTodos: builder.query<Todo[], void>({
            query: () => "/todos",
            providesTags: ["Todos"]
        }),
        updateTodo: builder.mutation<Todo, { id: string, data: Partial<Todo> }>({
            query: ({ id, data }) => ({
                url: `/todos/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Todos"],
        }),
        createTodo: builder.mutation<Todo, { name: string, description: string, completed: boolean }>({
            query: (todo) => ({
                url: "/addTodos",
                method: "POST",
                body: todo,
                invalidatesTags: ["Todos"],
            }),
        }),
    }),
});

export const { useGetTodosQuery, useUpdateTodoMutation, useCreateTodoMutation } = baseApi;