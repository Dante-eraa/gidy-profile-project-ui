// services/educationApi.js

import { baseApi } from "./baseApi";

export const educationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEducations: builder.query({
      query: () => "/education",
      providesTags: ["Education"],
    }),

    getPublicEducations: builder.query({
      query: (profileId) => `/education/public/${profileId}`,
      providesTags: ["Education"],
    }),

    createEducation: builder.mutation({
      query: (data) => ({
        url: "/education",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Education", "PublicProfile"],
    }),

    updateEducation: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/education/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Education", "PublicProfile"],
    }),

    deleteEducation: builder.mutation({
      query: (id) => ({
        url: `/education/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Education", "PublicProfile"],
    }),
  }),
});

export const {
  useGetEducationsQuery,
  useGetPublicEducationsQuery,
  useCreateEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
} = educationApi;
