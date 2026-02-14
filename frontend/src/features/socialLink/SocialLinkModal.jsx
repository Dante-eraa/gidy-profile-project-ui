import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useCreateSocialLinkMutation } from "../../services/socialLinkApi";

const schema = Yup.object({
  platform: Yup.string().required("Platform required"),
  url: Yup.string().url("Invalid URL").required("URL required"),
});

const PLATFORM_OPTIONS = [
  "LINKEDIN",
  "GITHUB",
  "TWITTER",
  "PORTFOLIO",
  "OTHER",
];

export default function SocialLinkModal({ isOpen, onClose }) {
  const [createSocialLink] = useCreateSocialLinkMutation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[420px] rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Add Social Link</h3>

        <Formik
          initialValues={{ platform: "", url: "" }}
          validationSchema={schema}
          onSubmit={async (values) => {
            try {
              await createSocialLink(values).unwrap();
              toast.success("Social link added");
              onClose();
            } catch (err) {
              toast.error("Failed");
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <label className="text-sm">Platform</label>
                <Field
                  as="select"
                  name="platform"
                  className="w-full border p-2 rounded-md mt-1"
                >
                  <option value="">Select</option>
                  {PLATFORM_OPTIONS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </Field>
                {errors.platform && touched.platform && (
                  <p className="text-xs text-red-500">{errors.platform}</p>
                )}
              </div>

              <div>
                <label className="text-sm">URL</label>
                <Field
                  name="url"
                  className="w-full border p-2 rounded-md mt-1"
                />
                {errors.url && touched.url && (
                  <p className="text-xs text-red-500">{errors.url}</p>
                )}
              </div>

              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-sm text-gray-500"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-[#0059d6] text-white px-4 py-2 rounded-md text-sm"
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
