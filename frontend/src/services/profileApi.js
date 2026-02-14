import { baseApi } from "./baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 Update Logged-in User Profile
    updateProfile: builder.mutation({
      query: (formData) => ({
        url: "/profile",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
    }),

    // 🔹 Get Logged-in User Profile
    getProfile: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    // 🔥 NEW: Get Public Profile By Slug
    getPublicProfile: builder.query({
      query: (slug) => ({
        url: `/profile/public/${slug}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useGetProfileQuery,
  useGetPublicProfileQuery,
} = profileApi;
