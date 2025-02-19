import type {
  TContactInputsNames,
  TProfileInputsNames,
  TRegisterInputsNames,
  TResetInputsNames,
} from "@/types";

export interface IAxiosError {
  status: number;
  message: string;
  response: {
    data: {
      message: string;
    };
  };
}

export interface IFormInput {
  name: string;
  placeholder: string;
  type: string;
  validation?: {
    required?: string;
    minLength?: number;
    maxLength?: number;
    pattern?: {
      value: RegExp;
      message: string;
    };
  };
}

export interface IRegisterInput extends IFormInput {
  name: TRegisterInputsNames;
}

export interface IResetInput extends IFormInput {
  name: TResetInputsNames;
}
export interface IProfileInput extends IFormInput {
  name: TProfileInputsNames;
}
export interface IContactForm extends IFormInput {
  name: TContactInputsNames;
}

export interface IRegisterForm {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  confirmedPassword: string;
  address: string;
  phone: string;
  image: File;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  firstName: string;
  secondName: string;
  email: string;
  image?: string;
  verified: boolean;
  token: string;
  phone: string | null;
  address: string | null;
  role: string | null;
  createdAt: string;
  isGoogleUser?: boolean;
}

export interface IProduct {
  id: number | string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  hasDiscount: boolean;
  priceBeforeDiscount: number;
  productCategoryId: string;
  productCategory: string;
  category?: string;
  quantity?: number;
  color?: string;
  size?: string | number;
  variants?: Colors[];
  productImages?: { id: number; imageUrl: string }[];
}

export interface Colors {
  id: number | string;
  color: string;
  sizes: ISize[];
}

export interface ISize {
  id: number;
  size: string;
  quantity: string;
}

export interface IOrder {
  items: IProduct[];
  totalAmount: number;
  id: string;
  email: string;
  firstName: string;
  secondName: string;
  phone: string;
  address: string;
  sessionId: string;
  status: string;
  createdAt: Date;
}

export interface IQuery<T> {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: T[];
}

export interface IAnalytics {
  metrics: {
    totalOrders: number;
    totalRevenue: number;
    totalProducts: number;
    totalCustomers: number;
  };
  charts: {
    topProducts: {
      id: string;
      name: string;
      quantity: number;
    }[];
    salesOverview: {
      createdAt: string;
      _sum: { totalAmount: number };
    }[];
  };
  recentOrders: IOrder[];
}
