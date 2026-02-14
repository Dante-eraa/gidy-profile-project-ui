import { baseApi } from "./baseApi";

export const aiApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    generateBio: builder.mutation({
      query: () => ({
        url: "/ai/generate-bio",
        method: "POST",
      }),
    }),
  }),
});

export const { useGenerateBioMutation } = aiApi;
