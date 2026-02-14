import { baseApi } from "./baseApi";

export const certificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Get All Certifications
    getCertifications: builder.query({
      query: () => ({
        url: "/certifications",
        method: "GET",
      }),
      providesTags: ["Certification"],
    }),

    // ✅ Create Certification
    createCertification: builder.mutation({
      query: (data) => ({
        url: "/certifications",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Certification"],
    }),

    // ✅ Update Certification
    updateCertification: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/certifications/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Certification"],
    }),

    // ✅ Delete Certification
    deleteCertification: builder.mutation({
      query: (id) => ({
        url: `/certifications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Certification"],
    }),
  }),
});

export const {
  useGetCertificationsQuery,
  useCreateCertificationMutation,
  useUpdateCertificationMutation,
  useDeleteCertificationMutation,
} = certificationApi;
