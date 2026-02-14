import { Formik, Form } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import InputField from "../../components/ui/InputField";
import {
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
} from "../../services/experienceApi";

const employmentOptions = [
  { label: "Full Time", value: "FULL_TIME" },
  { label: "Part Time", value: "PART_TIME" },
  { label: "Contract", value: "CONTRACT" },
  { label: "Internship", value: "INTERNSHIP" },
  { label: "Freelance", value: "FREELANCE" },
];

const validationSchema = Yup.object({
  title: Yup.string().required("Role is required"),
  company: Yup.string().required("Company is required"),
  employmentType: Yup.string().required("Employment type is required"),
  startDate: Yup.date().required("Start date is required"),
});

export default function ExperienceModal({ isOpen, onClose, experience }) {
  const [createExperience] = useCreateExperienceMutation();
  const [updateExperience] = useUpdateExperienceMutation();

  const isEdit = Boolean(experience);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[1px] m-0">
      <div
        className="
          w-[520px]
          bg-white
          rounded-lg
          shadow-[0_8px_30px_rgba(0,0,0,0.12)]
          px-8
          py-7
          max-h-[90vh]
          overflow-y-auto
        "
      >
        {/* TITLE */}
        <h2 className="text-[16px] font-semibold text-gray-700 mb-6">
          {isEdit ? "Edit Experience" : "Add Experience"}
        </h2>

        <Formik
          enableReinitialize
          validationSchema={validationSchema}
          initialValues={{
            title: experience?.title || "",
            company: experience?.company || "",
            employmentType: experience?.employmentType || "",
            location: experience?.location || "",
            startDate: experience?.startDate
              ? experience.startDate.split("T")[0]
              : "",
            endDate: experience?.endDate
              ? experience.endDate.split("T")[0]
              : "",
            isCurrentlyWorking: experience?.isCurrentlyWorking || false,
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const payload = {
                ...values,
                endDate: values.isCurrentlyWorking
                  ? null
                  : values.endDate || null,
              };

              if (isEdit) {
                await updateExperience({
                  id: experience.id,
                  ...payload,
                }).unwrap();
                toast.success("Experience updated successfully");
              } else {
                await createExperience(payload).unwrap();
                toast.success("Experience added successfully");
              }

              onClose();
            } catch (error) {
              toast.error(error?.data?.message || "Something went wrong");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              {/* FORM BODY */}
              <div className="space-y-5">
                <InputField label="Role" name="title" required />

                <InputField label="Company Name" name="company" required />

                <InputField
                  label="Employment Type"
                  name="employmentType"
                  type="select"
                  options={employmentOptions}
                  required
                />

                <InputField label="Location" name="location" />

                <InputField
                  label="Date of joining"
                  name="startDate"
                  type="date"
                  required
                />

                <InputField
                  label="Date of leaving"
                  name="endDate"
                  type="date"
                  disabled={values.isCurrentlyWorking}
                />

                <InputField
                  label="Currently working in this role"
                  name="isCurrentlyWorking"
                  type="checkbox"
                />
              </div>

              {/* FOOTER */}
              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="text-[13px] font-medium text-gray-500 hover:text-gray-700"
                >
                  CANCEL
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    min-w-[90px]
                    h-[36px]
                    px-5
                    text-[13px]
                    font-medium
                    rounded-md
                    bg-[#0059d6]
                    text-white
                    hover:bg-[#0047ab]
                    disabled:bg-blue-300
                    flex items-center justify-center gap-2
                    transition-colors duration-200
                  "
                >
                  {isSubmitting && (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  )}
                  {isEdit ? "UPDATE" : "ADD"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
