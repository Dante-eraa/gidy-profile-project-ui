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
      invalidatesTags: ["CareerVision", "PublicProfile"],
    }),

    updateCareerVision: builder.mutation({
      query: (data) => ({
        url: "/career-vision",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["CareerVision", "PublicProfile"],
    }),
  }),
});

export const {
  useGetCareerVisionQuery,
  useCreateCareerVisionMutation,
  useUpdateCareerVisionMutation,
} = careerVisionApi;
