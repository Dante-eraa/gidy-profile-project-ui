import { useState } from "react";
import {
  useUpdateProfileMutation,
  useGetProfileQuery,
} from "../../services/profileApi";
import { Camera } from "lucide-react";
import toast from "react-hot-toast";
import { Formik, Form } from "formik";
import { useSelector } from "react-redux";

import { profileSchema } from "../../validations/profileSchema";
import InputField from "../../components/ui/InputField";
import SelectField from "../../components/ui/SelectField";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const { data, isLoading: isProfileLoading } = useGetProfileQuery();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      a;
      setPreview(URL.createObjectURL(file));
    }
  };
  const ROLE_OPTIONS = ["FRESHER", "STUDENT", "GRADUATE", "PROFESSIONAL"];

  if (isProfileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f6f8] flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-8">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <img
              src={
                preview ||
                data?.data?.profileImage ||
                "https://d2d0jobwzy0nc3.cloudfront.net/static/UserProfile_MaleIcon"
              }
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-gray-200"
            />

            <label className="absolute bottom-1 right-1 bg-[#0059d6] text-white p-2 rounded-full cursor-pointer hover:bg-[#0047b3] transition">
              <Camera size={16} />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        {/* ================== Formik Form ================== */}
        <Formik
          enableReinitialize
          initialValues={{
            firstName: data?.data?.firstName || "",
            lastName: data?.data?.lastName || "",
            role: data?.data?.role || "",
            location: data?.data?.location || "",
          }}
          validationSchema={profileSchema}
          onSubmit={async (values) => {
            try {
              const formData = new FormData();

              formData.append("firstName", values.firstName);
              formData.append("lastName", values.lastName);
              formData.append("role", values.role);

              if (values.location) {
                formData.append("location", values.location);
              }

              if (profileImage) {
                formData.append("profileImage", profileImage);
              }

              const response = await updateProfile(formData).unwrap();

              toast.success(
                response.message || "Profile updated successfully 🎉",
              );
              navigate("/career-vision");
            } catch (err) {
              toast.error(err?.data?.message || "Update failed");
            }
          }}
        >
          {() => (
            <Form className="space-y-6">
              {/* Email (Disabled) */}
              {/* Email (From Auth Slice) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full h-12 px-4 border border-gray-200 bg-gray-100 rounded-md text-sm cursor-not-allowed"
                />
              </div>

              <InputField label="First Name" name="firstName" required />

              <InputField label="Last Name" name="lastName" required />

              <SelectField
                label="Role"
                name="role"
                options={ROLE_OPTIONS}
                required
              />

              <InputField label="Location" name="location" />

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                >
                  CANCEL
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#0059d6] hover:bg-[#0047b3] text-white px-6 py-2 rounded-md text-sm font-medium transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Updating..." : "Next"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
