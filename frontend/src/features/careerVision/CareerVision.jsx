import { Formik, Form } from "formik";
import { useSelector } from "react-redux";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCreateCareerVisionMutation } from "../../services/careerVisionApi";
import InputField from "../../components/ui/InputField";
import SelectField from "../../components/ui/SelectField";
import * as Yup from "yup";

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

export default function CareerVision() {
  const navigate = useNavigate();
  const [createCareerVision, { isLoading }] = useCreateCareerVisionMutation();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-[#f5f6f8] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-8">Your Career Vision</h2>

        <Formik
          initialValues={{
            careerGoal: "",
            growingInto: "",
            growthSpace: "",
            inspiredBy: "",
          }}
          validationSchema={careerVisionSchema}
          onSubmit={async (values) => {
            try {
              await createCareerVision(values).unwrap();
              toast.success("Career Vision saved 🚀");
              navigate(`/profile/${user?.profile?.slug}`);
            } catch (err) {
              toast.error(err?.data?.message || "Something went wrong");
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

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#0059d6] hover:bg-[#0047b3] text-white px-6 py-2 rounded-md text-sm font-medium transition disabled:bg-gray-300"
                >
                  {isLoading ? "Saving..." : "Finish"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
