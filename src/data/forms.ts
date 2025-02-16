import type {
  IContactForm,
  IProfileInput,
  IRegisterInput,
  IResetInput,
} from "@/interfaces";

export const REGISTER_FORM: IRegisterInput[] = [
  {
    name: "firstName",
    placeholder: "First Name",
    type: "text",
  },
  {
    name: "secondName",
    placeholder: "Second Name",
    type: "text",
  },
  {
    name: "email",
    placeholder: "Email",
    type: "email",
  },
  {
    name: "phone",
    placeholder: "Phone",
    type: "string",
  },
  {
    name: "password",
    placeholder: "Password",
    type: "password",
  },
  {
    name: "confirmedPassword",
    placeholder: "Confirm Password",
    type: "password",
  },
  {
    name: "address",
    placeholder: "Address",
    type: "text",
  },
  {
    name: "image",
    placeholder: "Profile Image",
    type: "file",
  },
];

export const RESET_FORM: IResetInput[] = [
  {
    name: "otp",
    placeholder: "otp code",
    type: "number",
  },
  {
    name: "newPassword",
    placeholder: "Password",
    type: "password",
  },
  {
    name: "confirmedNewPassword",
    placeholder: "Confirm Password",
    type: "password",
  },
];

export const PROFILE_FORM: IProfileInput[] = [
  {
    name: "firstName",
    placeholder: "First Name",
    type: "text",
    validation: {
      required: "firstName is required",
      minLength: 3,
      maxLength: 20,
    },
  },
  {
    name: "secondName",
    placeholder: "Second Name",
    type: "text",
    validation: {
      required: "second name is required",
      minLength: 3,
      maxLength: 20,
    },
  },
  {
    name: "phone",
    placeholder: "Phone",
    type: "number",
    validation: {
      required: "phone is required",
      maxLength: 11,
      pattern: {
        value: /01(0|1|2|5)\d{8}/i,
        message: "invalid phone number",
      },
    },
  },
  {
    name: "address",
    placeholder: "Address",
    type: "text",
    validation: {
      required: "address is required",
      minLength: 6,
    },
  },
  {
    name: "image",
    placeholder: "Profile Image",
    type: "file",
    validation: {
      required: "profile image is required",
    },
  },
];

export const CONTACT_FORM: IContactForm[] = [
  {
    name: "fullName",
    placeholder: "Full Name",
    type: "text",
    validation: {
      required: "Full Name is required",
      minLength: 3,
      maxLength: 50,
    },
  },
  {
    name: "email",
    placeholder: "Email",
    type: "email",
    validation: {
      required: "email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "invalid email address",
      },
    },
  },
  {
    name: "message",
    placeholder: "Message",
    type: "textarea",
    validation: {
      required: "message is required",
      minLength: 20,
    },
  },
];
