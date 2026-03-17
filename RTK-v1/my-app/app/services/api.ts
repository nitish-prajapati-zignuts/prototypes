import {
    createApi,
    fetchBaseQuery,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://dummyjson.com";

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
        // Professional touch: Pull token from state if needed
        const token = localStorage.getItem("token");
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        console.warn("Unauthorized! Redirecting or refreshing...");
        // Logic for logout or token refresh goes here
    }

    return result;
};

export const projectApi = createApi({
    reducerPath: "projectApi", // Usually good to append 'Api'
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Projects"],
    endpoints: (builder) => ({
        // Get all products/projects
        getProjects: builder.query<any, void>({
            query: () => "/products",
            providesTags: (result) =>
                result
                    ? [
                        ...result.products.map(({ id }: any) => ({ type: "Projects" as const, id })),
                        { type: "Projects", id: "LIST" },
                    ]
                    : [{ type: "Projects", id: "LIST" }],
        }),

        // Get single product/project
        getProjectById: builder.query<any, number>({
            query: (id) => `/products/${id}`,
            providesTags: (result, error, id) => [{ type: "Projects", id }],
            // Removed invalidatesTags from here
        }),
        addProject: builder.mutation<any, any>({
            query: (body) => ({
                url: "/products/add",
                method: "POST",
                body,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(projectApi.util.invalidateTags([{ type: "Projects", id: "LIST" }]));
                } catch (error) {
                    console.error("Failed to add project:", error);
                }
            },
            invalidatesTags: [{ type: "Projects", id: "LIST" }],
        }),
        updateProject: builder.mutation<any, any>({
            query: ({ id, body }) => ({
                url: `/products/${id}`,
                method: "PUT",
                body,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(projectApi.util.invalidateTags([{ type: "Projects", id: "LIST" }]));
                } catch (error) {
                    console.error("Failed to update project:", error);
                }
            },
            invalidatesTags: [{ type: "Projects", id: "LIST" }],
        }),
        deleteProject: builder.mutation<any, number>({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(projectApi.util.invalidateTags([{ type: "Projects", id: "LIST" }]));
                } catch (error) {
                    console.error("Failed to delete project:", error);
                }
            },
            invalidatesTags: [{ type: "Projects", id: "LIST" }],
        }),
    }),
});

export const {
    useGetProjectsQuery,
    useGetProjectByIdQuery,
    useAddProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation
} = projectApi;