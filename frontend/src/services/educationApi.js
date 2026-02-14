// services/educationApi.js

import { baseApi } from "./baseApi";

export const educationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEducations: builder.query({
      query: () => "/education",
      providesTags: ["Education"],
    }),

    createEducation: builder.mutation({
      query: (data) => ({
        url: "/education",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Education"],
    }),

    updateEducation: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/education/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Education"],
    }),

    deleteEducation: builder.mutation({
      query: (id) => ({
        url: `/education/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Education"],
    }),
  }),
});

export const {
  useGetEducationsQuery,
  useCreateEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
} = educationApi;
