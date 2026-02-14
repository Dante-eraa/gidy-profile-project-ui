import { Formik, Form } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import InputField from "../../components/ui/InputField";
import FormModal from "../../components/ui/FormModal";
import {
  useCreateEducationMutation,
  useUpdateEducationMutation,
} from "../../services/educationApi";

const validationSchema = Yup.object({
  degree: Yup.string().required("Degree is required"),
  field: Yup.string().required("Field of study is required"),
  institution: Yup.string().required("College is required"),
  location: Yup.string().required("Location is required"),
  startYear: Yup.date().required("Start date is required"),
  endYear: Yup.date().when("isCurrentlyStudying", {
    is: false,
    then: (schema) => schema.required("Completion date is required"),
  }),
});

export default function EducationModal({ isOpen, onClose, education }) {
  const [createEducation] = useCreateEducationMutation();
  const [updateEducation] = useUpdateEducationMutation();

  const isEdit = Boolean(education);

  if (!isOpen) return null;

  return (
    <Formik
      enableReinitialize
      validationSchema={validationSchema}
      initialValues={{
        degree: education?.degree || "",
        field: education?.field || "",
        institution: education?.institution || "",
        location: education?.location || "",
        startYear: education?.startYear
          ? education.startYear.split("T")[0]
          : "",
        endYear: education?.endYear ? education.endYear.split("T")[0] : "",
        isCurrentlyStudying: education?.isCurrentlyStudying || false,
        grade: education?.grade || "",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const payload = {
            ...values,
            endYear: values.isCurrentlyStudying ? null : values.endYear || null,
          };

          if (isEdit) {
            await updateEducation({
              id: education.id,
              ...payload,
            }).unwrap();
            toast.success("Education updated successfully");
          } else {
            await createEducation(payload).unwrap();
            toast.success("Education added successfully");
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
          <FormModal
            title={isEdit ? "Edit Education" : "Add Education"}
            onClose={onClose}
            isSubmitting={isSubmitting}
            submitLabel={isEdit ? "UPDATE" : "ADD"}
          >
            <InputField label="College" name="institution" required />

            <InputField label="Degree" name="degree" required />

            <InputField label="Field of Study" name="field" required />

            <InputField label="Location" name="location" required />

            <InputField
              label="Date of joining"
              name="startYear"
              type="date"
              required
            />

            <InputField
              label="Currently studying here / not completed"
              name="isCurrentlyStudying"
              type="checkbox"
            />

            {/* OR Divider */}
            <div className="flex items-center gap-[12px]">
              <div className="flex-1 h-[1px] bg-[#E5E7EB]" />
              <span className="text-[12px] text-[#9CA3AF] font-medium">OR</span>
              <div className="flex-1 h-[1px] bg-[#E5E7EB]" />
            </div>

            <InputField
              label="Date of completion"
              name="endYear"
              type="date"
              disabled={values.isCurrentlyStudying}
            />

            <InputField label="Grade" name="grade" />
          </FormModal>
        </Form>
      )}
    </Formik>
  );
}
