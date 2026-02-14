import { baseApi } from "./baseApi";

export const certificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Get All Certifications
    getCertifications: builder.query({
      query: () => ({
        url: "/certificate",
        method: "GET",
      }),
      providesTags: ["Certification"],
    }),
    getPublicCertifications: builder.query({
      query: (profileId) => `/certificate/public/${profileId}`,
      providesTags: ["Certification"],
    }),

    // ✅ Create Certification
    createCertification: builder.mutation({
      query: (data) => ({
        url: "/certificate",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Certification"],
    }),

    // ✅ Update Certification
    updateCertification: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/certificate/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Certification"],
    }),

    // ✅ Delete Certification
    deleteCertification: builder.mutation({
      query: (id) => ({
        url: `/certificate/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Certification"],
    }),
  }),
});

export const {
  useGetCertificationsQuery,
  useGetPublicCertificationsQuery,
  useCreateCertificationMutation,
  useUpdateCertificationMutation,
  useDeleteCertificationMutation,
} = certificationApi;
