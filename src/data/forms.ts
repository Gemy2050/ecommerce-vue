import type {
  IContactForm,
  IProductsForm,
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

// ** Dashboard **
export const ProductsForm: IProductsForm[] = [
  {
    label: "Product Image",
    name: "image",
    placeholder: "Product Image",
    type: "file",
    validation: {
      required: "Product Image is required",
    },
  },
  {
    label: "Product Name",
    name: "name",
    placeholder: "Product Name",
    type: "text",
    validation: {
      required: "Product Name is required",
    },
  },

  {
    label: "Product Category",
    name: "productCategoryId",
    placeholder: "Product Category",
    isDynamicOptions: true,
    type: "select",
    validation: {
      required: "Product Category is required",
    },
  },
  {
    label: "Product Price",
    name: "price",
    placeholder: "Product Price",
    type: "number",
    validation: {
      required: "Product Price is required",
    },
  },
  {
    label: "has discount ?",
    name: "hasDiscount",
    placeholder: "Product Category",
    type: "select",
    defaultValue: "Yes",
    options: ["No", "Yes"],
    validation: {
      required: "Product Category is required",
    },
  },
  {
    label: "Product Discount",
    name: "discount",
    placeholder: "Discount",
    type: "number",
    validation: {
      required: "Product Discount is required",
    },
  },
  {
    label: "Product Description",
    name: "description",
    placeholder: "Product Description",
    type: "editor",
    validation: {
      required: "Product Description is required",
    },
  },
];
