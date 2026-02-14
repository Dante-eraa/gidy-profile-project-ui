import { baseApi } from "./baseApi";

export const careerVisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCareerVision: builder.query({
      query: () => "/career-vision",
      providesTags: ["CareerVision"],
    }),

    createCareerVision: builder.mutation({
      query: (data) => ({
        url: "/career-vision",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CareerVision"],
    }),
  }),
});

export const { useGetCareerVisionQuery, useCreateCareerVisionMutation } =
  careerVisionApi;
