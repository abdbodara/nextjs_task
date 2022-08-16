import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const userApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",

    prepareHeaders: (header, { getState, endpoint }) => {
      header.set("Accept", "application/json");
      header.set("platform", 'web');
      return header;
    },
  }),
  tagTypes: ['register','users'],
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (params) => {

        return {
          url: "/users",
          method: "POST",
          body: params,
        };
      },
      transformResponse: (response) => response,
      providesTags: ["register"],
    }),
    getUsers: builder.query({
      query: () => {

        return {
          url: "/users",
          method: "GET",
        };
      },
      transformResponse: (response) => response,
      providesTags: ["users"],
    }),
  }),
});

export const {

  useCreateUserMutation,
  useGetUsersQuery
} = userApiSlice;
