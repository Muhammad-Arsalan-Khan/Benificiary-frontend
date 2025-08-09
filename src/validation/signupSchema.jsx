import * as yup from "yup";

const signupSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  type: yup
    .string()
    .required('Type is required')
    .oneOf(['Deparment', 'Receptionist'], 'Type must be either "res" or "dep"'),
  cnic: yup
      .string()
      .required('CNIC is required')
      .matches(/^\d{13}$/, 'CNIC must be exactly 13 digits (no dashes)'),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain an uppercase letter")
    .matches(/[a-z]/, "Must contain a lowercase letter")
    .matches(/[0-9]/, "Must contain a number")
    .matches(/[^a-zA-Z0-9]/, "Must contain a special character")
    .required("Password is required"),
})

export default signupSchema
