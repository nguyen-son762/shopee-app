export interface AddressDef {
  name?: string;
  phone_number?: string;
  city: string;
  street: string;
  default?: boolean;
}

export type AuthDef = {
  _id: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  access_token?: string;
  refresh_token?: string;
  active?: boolean;
  phone_number?: string;
  avatar_url?: string;
  address?: AddressDef[];
  liked?: {
    model_id: string;
    product: string;
  }[];
};

export type AuthRequest = {
  phone_number: string;
  password: string;
};

export type PlatformAuthRequest = {
  _id: string;
};

export type AuthResponse = {
  data: AuthDef;
  access_token?: string;
};

export interface FacebookAuthResponse {
  email: string;
  first_name: string;
  id: string;
  last_name: string;
  picture: {
    data: {
      height: number;
      is_silhouette: boolean;
      url: string;
      width: number;
    };
  };
}

export interface GoogleAuthResponse {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

export interface LoginByGoogleOrFacebookRequest {
  _id: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  email: string;
}

export interface SignUpUserRequest {
  phone_number: string;
  password: string;
}

export interface VerifyOtpRequest {
  access_token: string;
  otp: string;
}

export type SignUpResponse = AuthResponse;

export type LikedProductRequest = {
  user_id: string;
  product: string;
};
