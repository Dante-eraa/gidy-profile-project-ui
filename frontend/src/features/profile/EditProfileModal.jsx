import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../services/profileApi";
import { useRef } from "react";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";
import { useGenerateBioMutation } from "../../services/aiApi";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  location: Yup.string().required("Location is required"),
  role: Yup.string()
    .oneOf(["FRESHER", "STUDENT", "GRADUATE", "PROFESSIONAL"])
    .required("Role is required"),
  bio: Yup.string().max(500, "Maximum 500 characters allowed"),
  resume: Yup.mixed()
    .nullable()
    .test("fileFormat", "Only PDF files are allowed", (value) => {
      if (!value) return true;
      return value.type === "application/pdf";
    }),
});

export default function EditProfileModal({ isOpen, onClose }) {
  const fileRef = useRef();

  const { data, isLoading } = useGetProfileQuery(undefined, {
    skip: !isOpen,
  });
  const [generateBio, { isLoading: isGenerating }] = useGenerateBioMutation();

  const [updateProfile] = useUpdateProfileMutation();

  const profile = data?.data || {};

  if (!isOpen) return null;
  if (isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex items-center justify-center px-4 overflow-y-auto">
      <div className="w-[520px] bg-white rounded-xl shadow-xl px-10 pt-20 pb-8 relative max-h-[90vh] overflow-y-auto">
        <Formik
          enableReinitialize
          initialValues={{
            firstName: profile.firstName || "",
            lastName: profile.lastName || "",
            location: profile.location || "",
            role: profile.role || "STUDENT",
            bio: profile.bio || "",
            profileImage: null,
            resume: null,
          }}
          validationSchema={validationSchema}
          validateOnChange={false}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const formData = new FormData();
              formData.append("firstName", values.firstName);
              formData.append("lastName", values.lastName);
              formData.append("location", values.location);
              formData.append("role", values.role);

              formData.append("bio", values.bio || "");

              if (values.profileImage) {
                formData.append("profileImage", values.profileImage);
              }

              if (values.resume) {
                formData.append("resume", values.resume);
              }

              await updateProfile(formData).unwrap();
              toast.success("Profile updated successfully");
              onClose();
            } catch (error) {
              toast.error(error?.data?.message || "Update failed");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, errors, touched, setFieldValue, isSubmitting }) => {
            const imagePreview = values.profileImage
              ? URL.createObjectURL(values.profileImage)
              : profile.profileImage;

            return (
              <>
                {/* Avatar */}
                <div className="absolute  left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-100 flex items-center justify-center text-3xl font-semibold text-gray-700">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      profile.firstName?.charAt(0)?.toUpperCase()
                    )}

                    <button
                      type="button"
                      onClick={() => fileRef.current.click()}
                      className="absolute bottom-1 right-1 bg-[#0059D6] text-white w-7 h-7 rounded-full flex items-center justify-center shadow"
                    >
                      <Pencil size={14} />
                    </button>
                  </div>
                </div>

                <h2 className="text-[15px] font-semibold text-gray-700 mb-6 text-center">
                  Edit Profile
                </h2>

                <Form className="space-y-4">
                  {/* Hidden Image Input */}
                  <input
                    type="file"
                    ref={fileRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.currentTarget.files[0];
                      if (file) setFieldValue("profileImage", file);
                    }}
                  />

                  {/* First Name */}
                  <div>
                    <label className="text-[12px] text-gray-500">
                      First Name *
                    </label>
                    <input
                      value={values.firstName}
                      onChange={(e) =>
                        setFieldValue("firstName", e.target.value)
                      }
                      className={`w-full h-[36px] mt-1 px-3 border rounded-md bg-gray-50 text-sm focus:outline-none focus:border-[#0059D6]
                      ${
                        errors.firstName && touched.firstName
                          ? "border-red-500"
                          : "border-gray-200"
                      }`}
                    />
                    {errors.firstName && touched.firstName && (
                      <p className="text-[11px] text-red-500 mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="text-[12px] text-gray-500">
                      Last Name *
                    </label>
                    <input
                      value={values.lastName}
                      onChange={(e) =>
                        setFieldValue("lastName", e.target.value)
                      }
                      className={`w-full h-[36px] mt-1 px-3 border rounded-md bg-gray-50 text-sm focus:outline-none focus:border-[#0059D6]
                      ${
                        errors.lastName && touched.lastName
                          ? "border-red-500"
                          : "border-gray-200"
                      }`}
                    />
                    {errors.lastName && touched.lastName && (
                      <p className="text-[11px] text-red-500 mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <label className="text-[12px] text-gray-500">
                      Location *
                    </label>
                    <input
                      value={values.location}
                      onChange={(e) =>
                        setFieldValue("location", e.target.value)
                      }
                      className={`w-full h-[36px] mt-1 px-3 border rounded-md bg-gray-50 text-sm focus:outline-none focus:border-[#0059D6]
                      ${
                        errors.location && touched.location
                          ? "border-red-500"
                          : "border-gray-200"
                      }`}
                    />
                    {errors.location && touched.location && (
                      <p className="text-[11px] text-red-500 mt-1">
                        {errors.location}
                      </p>
                    )}
                  </div>
                  {/* Role */}
                  <div>
                    <label className="text-[12px] text-gray-500">Role *</label>
                    <select
                      value={values.role}
                      onChange={(e) => setFieldValue("role", e.target.value)}
                      className={`w-full h-[36px] mt-1 px-3 border rounded-md bg-gray-50 text-sm focus:outline-none focus:border-[#0059D6]
      ${errors.role && touched.role ? "border-red-500" : "border-gray-200"}`}
                    >
                      <option value="FRESHER">Fresher</option>
                      <option value="STUDENT">Student</option>
                      <option value="GRADUATE">Graduate</option>
                      <option value="PROFESSIONAL">Professional</option>
                    </select>

                    {errors.role && touched.role && (
                      <p className="text-[11px] text-red-500 mt-1">
                        {errors.role}
                      </p>
                    )}
                  </div>

                  {/* Bio */}
                  {/* Bio */}
                  <div>
                    <label className="text-[12px] text-gray-500 flex justify-between items-center">
                      <span>Bio</span>

                      <div className="flex items-center gap-3">
                        <span className="text-gray-400 text-[11px]">
                          {values.bio.length}/500
                        </span>

                        <button
                          type="button"
                          disabled={isGenerating}
                          onClick={async () => {
                            try {
                              const res = await generateBio().unwrap();

                              // backend returns:
                              // { success: true, message: "...", data: "bio text" }

                              setFieldValue("bio", res.data);
                              toast.success("AI bio generated");
                            } catch (error) {
                              toast.error("AI generation failed");
                            }
                          }}
                          className="text-[11px] font-medium text-[#0059D6] hover:underline disabled:opacity-50"
                        >
                          {isGenerating ? "Generating..." : "Generate with AI"}
                        </button>
                      </div>
                    </label>

                    <textarea
                      rows={4}
                      value={values.bio}
                      onChange={(e) => setFieldValue("bio", e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-sm focus:outline-none focus:border-[#0059D6]"
                    />
                  </div>

                  {/* Resume */}
                  <div>
                    <label className="text-[12px] text-gray-500">
                      Resume (PDF only)
                    </label>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) =>
                        setFieldValue("resume", e.currentTarget.files[0])
                      }
                      className="mt-1 text-sm"
                    />
                    {values.resume && (
                      <p className="text-[11px] text-gray-600 mt-1">
                        Selected: {values.resume.name}
                      </p>
                    )}
                    {errors.resume && (
                      <p className="text-[11px] text-red-500 mt-1">
                        {errors.resume}
                      </p>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex justify-end gap-6 mt-6">
                    <button
                      type="button"
                      onClick={onClose}
                      className="text-[12px] font-medium text-gray-500 hover:text-gray-700"
                    >
                      CANCEL
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-1.5 text-[12px] font-medium bg-[#0059D6] text-white rounded-md hover:bg-[#0047AB]"
                    >
                      {isSubmitting ? "Updating..." : "UPDATE"}
                    </button>
                  </div>
                </Form>
              </>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
