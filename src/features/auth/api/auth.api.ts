import { GOOGLE_URL_AUTHENTICATION, FACEBOOK_URL_AUTHENTICATION } from "@env";
import axios from "axios";
import { AuthEndpointsEnum } from "../auth";
import {
  AuthRequest,
  AuthResponse,
  FacebookAuthResponse,
  GoogleAuthResponse
} from "../types/auth.type";
import { api } from "app/api/api";

export const getUser = (user: AuthRequest): Promise<AuthResponse> => {
  return api.post(AuthEndpointsEnum.LOGIN, user);
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