import * as yup from "yup";

export const registerSchema = yup
  .object({
    firstName: yup
      .string()
      .required("First name is required")
      .min(3, "first name should be at least 3 characters"),
    secondName: yup
      .string()
      .required("Second name is required")
      .min(3, "last name should be at least 3 characters"),
    email: yup
      .string()
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email is not valid"
      )
      .required("Email is required"),
    phone: yup
      .string()
      .required("Phone is required")
      .matches(/^(?:\+20|0)1[0-2,5]\d{8}$/, "Phone is not valid"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .max(18, "Password must be at least 18 characters long"),
    confirmedPassword: yup
      .string()
      .required("confirm password is required")
      .oneOf([yup.ref("password")], "confirm password does not match password"),
    address: yup
      .string()
      .required("Address is required")
      .min(4, "address is too short"),
    image: yup.mixed().optional(),
  })
  .required();

export type RegisterFormData = yup.InferType<typeof registerSchema>;

//* Login Schema
export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email is not valid"
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(18, "Password must be at least 18 characters long"),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;

//* resetPassword Schema
export const resetPasswordSchema = yup.object({
  otp: yup
    .string()
    .required("otp code is required")
    .matches(/^[0-9]{6}$/, "otp code is not valid"),
  newPassword: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(18, "Password must be at least 18 characters long"),
  confirmedNewPassword: yup
    .string()
    .required("confirm password is required")
    .oneOf(
      [yup.ref("newPassword")],
      "confirm password does not match password"
    ),
});

export type ResetPasswordFormData = yup.InferType<typeof resetPasswordSchema>;

//* Profile Schema
export const profileSchema = yup
  .object({
    firstName: yup
      .string()
      .required("First name is required")
      .min(3, "first name should be at least 3 characters"),
    secondName: yup
      .string()
      .required("Second name is required")
      .min(3, "last name should be at least 3 characters"),
    phone: yup.string().required("Phone is required").min(11).max(11),
    address: yup
      .string()
      .required("Address is required")
      .min(4, "address is too short"),
    image: yup.mixed().required("image is required"),
  })
  .required();

export type ProfileFormData = yup.InferType<typeof profileSchema>;

//* Contact Schema

export const contactSchema = yup
  .object({
    fullName: yup
      .string()
      .required("Full name is required")
      .min(5, "Full name should be at least 5 characters")
      .max(50, "Full name should be at most 50 characters"),
    email: yup
      .string()
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email is not valid"
      ),
    message: yup.string().required("Message is required").min(20),
  })
  .required();

export type ContactFormData = yup.InferType<typeof contactSchema>;
