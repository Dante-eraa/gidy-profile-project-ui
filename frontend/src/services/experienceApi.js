// services/experienceApi.js
import { baseApi } from "./baseApi";

export const experienceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // PRIVATE (Owner)
    getExperiences: builder.query({
      query: () => "/experience",
      providesTags: ["Experience"],
    }),

    // PUBLIC (Guest view)
    getPublicExperiences: builder.query({
      query: (profileId) => `/experience/public/${profileId}`,
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
  useGetPublicExperiencesQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} = experienceApi;
