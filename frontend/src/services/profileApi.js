import { baseApi } from "./baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (formData) => ({
        url: "/profile",
        method: "PATCH",
        body: formData,
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
  }),
});

export const { useUpdateProfileMutation, useGetProfileQuery } = profileApi;
