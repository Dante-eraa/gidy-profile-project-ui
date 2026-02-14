import * as Yup from "yup";

export const profileSchema = Yup.object({
  firstName: Yup.string().trim().required("First Name is required"),
  lastName: Yup.string().trim().required("Last Name is required"),
  role: Yup.string()
    .oneOf(["FRESHER", "STUDENT", "GRADUATE", "PROFESSIONAL"])
    .required("Role is required"),
  location: Yup.string().trim(),
});
