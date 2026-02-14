import { baseApi } from "./baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (formData) => ({
        url: "/profile",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Profile", id: "CURRENT" },
        { type: "PublicProfile", id: "CURRENT" },
      ],
    }),

    getProfile: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      providesTags: [{ type: "Profile", id: "CURRENT" }],
    }),

    getPublicProfile: builder.query({
      query: (slug) => ({
        url: `/profile/public/${slug}`,
        method: "GET",
      }),
      providesTags: (result, error, slug) => [
        { type: "PublicProfile", id: slug },
      ],
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useGetProfileQuery,
  useGetPublicProfileQuery,
} = profileApi;
