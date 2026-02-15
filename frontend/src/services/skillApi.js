import { baseApi } from "./baseApi";

export const skillApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSkills: builder.query({
      query: (profileId) => `/skill/${profileId}`,
      providesTags: ["Skill"],
    }),

    createSkill: builder.mutation({
      query: (data) => ({
        url: "/skill",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Skill", "PublicProfile"],
    }),

    deleteSkill: builder.mutation({
      query: (id) => ({
        url: `/skill/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Skill", "PublicProfile"],
    }),

    endorseSkill: builder.mutation({
      query: (skillId) => ({
        url: `/skill/endorse/${skillId}`,
        method: "POST",
      }),
      invalidatesTags: ["Skill", "PublicProfile"],
    }),

    removeEndorsement: builder.mutation({
      query: (skillId) => ({
        url: `/skill/endorse/${skillId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Skill", "PublicProfile"],
    }),
  }),
});

export const {
  useGetSkillsQuery,
  useCreateSkillMutation,
  useDeleteSkillMutation,
  useEndorseSkillMutation,
  useRemoveEndorsementMutation,
} = skillApi;
