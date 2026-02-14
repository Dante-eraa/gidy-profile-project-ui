// services/experienceApi.js
import { baseApi } from "./baseApi";

export const experienceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getExperiences: builder.query({
      query: () => "/experience",
      providesTags: ["Experience"],
    }),

    createExperience: builder.mutation({
      query: (data) => ({
        url: "/experience",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Experience"],
    }),

    updateExperience: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/experience/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Experience"],
    }),

    deleteExperience: builder.mutation({
      query: (id) => ({
        url: `/experience/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Experience"],
    }),
  }),
});

export const {
  useGetExperiencesQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} = experienceApi;
