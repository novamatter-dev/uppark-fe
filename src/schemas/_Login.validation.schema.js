import * as yup from "yup";

const LoginValidationSchema = yup.object({
  phone: yup
    .string()
    .matches(/(01)(\d){8}\b/, "Enter a valid phone number")
    .required("Phone number is required"),
});

export default LoginValidationSchema;
