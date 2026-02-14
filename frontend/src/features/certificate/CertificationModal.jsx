import { Formik, Form } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import InputField from "../../components/ui/InputField";
import FormModal from "../../components/ui/FormModal";
import {
  useCreateCertificationMutation,
  useUpdateCertificationMutation,
} from "../../services/certificationApi";

const validationSchema = Yup.object({
  title: Yup.string().required("Certification name is required"),
  issuer: Yup.string().required("Issuer is required"),

  issueDate: Yup.string().required("Issue date is required"),

  expiryDate: Yup.string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .test(
      "expiry-after-issue",
      "Expiry date cannot be before issue date",
      function (value) {
        const { issueDate } = this.parent;
        if (!value || !issueDate) return true;
        return new Date(value) >= new Date(issueDate);
      },
    ),

  certificateUrl: Yup.string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .url("Enter a valid URL"),
});

export default function CertificationModal({ isOpen, onClose, certification }) {
  const [createCertification] = useCreateCertificationMutation();
  const [updateCertification] = useUpdateCertificationMutation();

  const isEdit = Boolean(certification);

  if (!isOpen) return null;

  return (
    <Formik
      enableReinitialize
      validationSchema={validationSchema}
      initialValues={{
        title: certification?.title || "",
        issuer: certification?.issuer || "",
        issueDate: certification?.issueDate
          ? certification.issueDate.split("T")[0]
          : "",
        expiryDate: certification?.expiryDate
          ? certification.expiryDate.split("T")[0]
          : "",
        certificateUrl: certification?.certificateUrl || "",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const payload = {
            ...values,
            expiryDate: values.expiryDate || null,
            certificateUrl: values.certificateUrl || null,
          };

          if (isEdit) {
            await updateCertification({
              id: certification.id,
              ...payload,
            }).unwrap();
            toast.success("Certification updated successfully");
          } else {
            await createCertification(payload).unwrap();
            toast.success("Certification added successfully");
          }

          onClose();
        } catch (error) {
          toast.error(error?.data?.message || "Something went wrong");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormModal
            title={isEdit ? "Edit Certification" : "Add Certification"}
            onClose={onClose}
            isSubmitting={isSubmitting}
            submitLabel={isEdit ? "UPDATE" : "ADD"}
          >
            <InputField label="Certification" name="title" required />

            <InputField label="Provider" name="issuer" required />

            <InputField
              label="Certificate Url"
              name="certificateUrl"
              type="url"
            />

            <InputField
              label="Issued Date"
              name="issueDate"
              type="date"
              required
            />

            <InputField label="Expiry Date" name="expiryDate" type="date" />
          </FormModal>
        </Form>
      )}
    </Formik>
  );
}
