import {
  SignUpUserRequest,
  SignUpResponse,
  VerifyOtpRequest,
  AuthDef,
  LikedProductRequest
} from "./../types/auth.type";
import { GOOGLE_URL_AUTHENTICATION, FACEBOOK_URL_AUTHENTICATION } from "@env";
import axios from "axios";
import { AuthEndpointsEnum } from "../auth";
import {
  AuthRequest,
  AuthResponse,
  FacebookAuthResponse,
  GoogleAuthResponse,
  LoginByGoogleOrFacebookRequest
} from "../types/auth.type";
import { api } from "app/api/api";

export const getUser = (user: AuthRequest): Promise<any> => {
  return api.post(AuthEndpointsEnum.LOGIN, {
    phone_number: user.phone_number.replace("0", "+84"),
    password: user.password
  });
};

export const getUserByGoogle = async (accessToken = ""): Promise<GoogleAuthResponse> => {
  const result = await axios
    .create({
      baseURL: GOOGLE_URL_AUTHENTICATION,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      withCredentials: true
    })
    .get(AuthEndpointsEnum.GOOGLE_AUTHENTICATION);
  return result.data as GoogleAuthResponse;
};

export const getUserByFacebook = async (accessToken = ""): Promise<FacebookAuthResponse> => {
  const result = await axios
    .create({
      baseURL: FACEBOOK_URL_AUTHENTICATION,
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })
    .get(AuthEndpointsEnum.FACEBOOK_AUTHENTICATION, {
      params: {
        fields: "first_name,last_name,email,picture.type(large)",
        access_token: accessToken
      }
    });
  return result.data as FacebookAuthResponse;
};

export const loginByGoogleOrFacebook = async (
  user: LoginByGoogleOrFacebookRequest
): Promise<AuthResponse> => {
  const result = await api.post<AuthResponse>(AuthEndpointsEnum.LOGIN_WITH_PLATFORM, user);
  return result.data;
};

export const signUpUser = async (user: SignUpUserRequest) => {
  const result = await api.post<SignUpResponse>(AuthEndpointsEnum.REGISTER, user);
  return result.data;
};

export const verifyOtp = async (data: VerifyOtpRequest) => {
  const result = await api.post<AuthResponse>(AuthEndpointsEnum.VERIFY, data);
  return result.data;
};

export const updateUser = async (params: Partial<AuthDef>) => {
  const result = await api.patch<AuthResponse>(AuthEndpointsEnum.UPDATE, params);
  return result.data;
};

export const likedProduct = async (params: LikedProductRequest) => {
  const result = await api.post(AuthEndpointsEnum.LIKED, params);
  return result.data;
};
