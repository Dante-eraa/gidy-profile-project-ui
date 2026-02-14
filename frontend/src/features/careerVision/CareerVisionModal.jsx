import { Formik, Form } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

import {
  useGetCareerVisionQuery,
  useCreateCareerVisionMutation,
  useUpdateCareerVisionMutation,
} from "../../services/careerVisionApi";

import InputField from "../../components/ui/InputField";
import SelectField from "../../components/ui/SelectField";

const careerVisionSchema = Yup.object({
  careerGoal: Yup.string().required("Career Goal is required"),
  growingInto: Yup.string().required("Growing Into is required"),
  growthSpace: Yup.string().required("Growth Space is required"),
  inspiredBy: Yup.string().required("Inspired By is required"),
});

const CAREER_GOAL_OPTIONS = [
  "Founder & CEO",
  "Tech Lead",
  "Product Manager",
  "AI Engineer",
  "Cloud Architect",
  "Startup Founder",
];

const GROWING_INTO_OPTIONS = [
  "Entry Level Professional",
  "Junior Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Data Scientist",
  "Team Lead",
];

const GROWTH_SPACE_OPTIONS = [
  "Cloud & Infrastructure",
  "Artificial Intelligence",
  "Web Development",
  "Cyber Security",
  "Blockchain",
  "Product Engineering",
];

export default function CareerVisionModal({ isOpen, onClose }) {
  const { data } = useGetCareerVisionQuery(undefined, {
    skip: !isOpen,
  });

  const [createCareerVision, { isLoading: isCreating }] =
    useCreateCareerVisionMutation();

  const [updateCareerVision, { isLoading: isUpdating }] =
    useUpdateCareerVisionMutation();

  const careerVision = data?.data;
  const isEdit = Boolean(careerVision);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-8">
          {isEdit ? "Edit Career Vision" : "Your Career Vision"}
        </h2>

        <Formik
          enableReinitialize
          initialValues={{
            careerGoal: careerVision?.careerGoal || "",
            growingInto: careerVision?.growingInto || "",
            growthSpace: careerVision?.growthSpace || "",
            inspiredBy: careerVision?.inspiredBy || "",
          }}
          validationSchema={careerVisionSchema}
          validateOnChange={false}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              if (isEdit) {
                await updateCareerVision(values).unwrap();
                toast.success("Career Vision updated 🚀");
              } else {
                await createCareerVision(values).unwrap();
                toast.success("Career Vision saved 🚀");
              }

              onClose();
            } catch (err) {
              toast.error(err?.data?.message || "Something went wrong");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {() => (
            <Form className="space-y-6">
              <SelectField
                label="Your Goal"
                name="careerGoal"
                options={CAREER_GOAL_OPTIONS}
                required
              />

              <SelectField
                label="What you’re growing into right now"
                name="growingInto"
                options={GROWING_INTO_OPTIONS}
                required
              />

              <SelectField
                label="The space you want to grow in"
                name="growthSpace"
                options={GROWTH_SPACE_OPTIONS}
                required
              />

              <InputField
                label="Inspired by"
                name="inspiredBy"
                placeholder="Hideo Kojima"
                required
              />

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  CANCEL
                </button>

                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="bg-[#0059d6] hover:bg-[#0047b3] text-white px-6 py-2 rounded-md text-sm font-medium transition disabled:bg-gray-300"
                >
                  {isCreating || isUpdating ? "Saving..." : "Finish"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
