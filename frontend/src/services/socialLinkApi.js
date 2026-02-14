import { baseApi } from "./baseApi";

export const socialLinkApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSocialLinks: builder.query({
      query: () => "/sociallinks",
      providesTags: ["SocialLinks"],
    }),

    createSocialLink: builder.mutation({
      query: (data) => ({
        url: "/sociallinks",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SocialLinks", "PublicProfile"],
    }),

    updateSocialLink: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/sociallinks/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["SocialLinks", "PublicProfile"],
    }),

    deleteSocialLink: builder.mutation({
      query: (id) => ({
        url: `/sociallinks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SocialLinks", "PublicProfile"],
    }),
  }),
});

export const {
  useGetSocialLinksQuery,
  useCreateSocialLinkMutation,
  useUpdateSocialLinkMutation,
  useDeleteSocialLinkMutation,
} = socialLinkApi;
