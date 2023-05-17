import { AUTH_IN_ASYNC_STORAGE } from "./../../../constants/common.constants";
import { AxiosError } from "axios";
import { SignUpUserRequest, VerifyOtpRequest } from "./../types/auth.type";
import { loginByGoogleOrFacebook, signUpUser, updateUser, verifyOtp } from "./../api/auth.api";
import { Action, Thunk, action, thunk, ThunkOn, thunkOn } from "easy-peasy";
import {
  AuthDef,
  AuthRequest,
  AuthResponse,
  LoginByGoogleOrFacebookRequest
} from "../types/auth.type";
import { getUser, getUserByFacebook, getUserByGoogle } from "../api/auth.api";
import store from "app/store";
import { ToastTypeEnum } from "app/features/app/toast/toast.type";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface AuthModel {
  user: AuthDef | null;
  isError: boolean;
  loading: boolean;
  set: Action<AuthModel, AuthResponse>;
  setLoading: Action<AuthModel, boolean>;
  reset: Action<AuthModel>;
  logout: Thunk<AuthModel>;
  login: Thunk<AuthModel, AuthRequest>;
  onGetUserByGoogle: Thunk<AuthModel, string>;
  onGetUserByFacebook: Thunk<AuthModel, string>;
  loginByGoogleOrFacebook: Thunk<AuthModel, LoginByGoogleOrFacebookRequest>;
  signUp: Thunk<AuthModel, SignUpUserRequest>;
  verifyOtp: Thunk<AuthModel, VerifyOtpRequest>;
  update: Thunk<AuthModel, Partial<AuthDef>>;
  onError: ThunkOn<AuthModel>;
}

const initialState = {
  user: null,
  isError: false,
  loading: false
};

export const auth: AuthModel = {
  ...initialState,
  set: action((state, payload) => {
    state.user = {
      ...payload.data,
      access_token: payload.access_token
    };
    AsyncStorage.setItem(AUTH_IN_ASYNC_STORAGE, JSON.stringify(state.user));
  }),
  setLoading: action((state, payload) => {
    state.loading = payload;
  }),
  reset: action((state) => {
    state.user = null;
  }),
  logout: thunk(async (actions) => {
    actions.reset();
    await AsyncStorage.removeItem(AUTH_IN_ASYNC_STORAGE);
  }),
  login: thunk(async (actions, payload) => {
    actions.setLoading(true);
    const user = await getUser(payload);
    actions.setLoading(false);
    actions.set(user.data);
  }),
  onGetUserByGoogle: thunk(async (actions, payload, { fail }) => {
    try {
      actions.setLoading(true);
      const { id, email, picture, given_name, family_name } = await getUserByGoogle(payload);
      await actions.loginByGoogleOrFacebook({
        _id: id,
        email: email,
        avatar_url: picture,
        first_name: family_name,
        last_name: given_name
      });
    } catch (err) {
      fail(err);
    } finally {
      actions.setLoading(false);
    }
  }),
  onGetUserByFacebook: thunk(async (actions, payload) => {
    actions.setLoading(true);
    const {
      email,
      id,
      first_name,
      last_name,
      picture: {
        data: { url }
      }
    } = await getUserByFacebook(payload);
    await actions.loginByGoogleOrFacebook({
      _id: id,
      email: email,
      avatar_url: url,
      first_name,
      last_name
    });
    actions.setLoading(false);
  }),
  loginByGoogleOrFacebook: thunk(async (actions, payload, { fail }) => {
    try {
      actions.setLoading(true);
      const result = await loginByGoogleOrFacebook(payload);
      actions.set(result);
    } catch (err) {
      fail(err);
    } finally {
      actions.setLoading(false);
    }
  }),
  signUp: thunk(async (actions, payload, { fail }) => {
    try {
      actions.setLoading(true);
      const result = await signUpUser({
        phone_number: "+84".concat(payload.phone_number.slice(1)),
        password: payload.password,
        first_name: payload.first_name,
        last_name: payload.last_name
      });
      actions.set(result);
      return result;
    } catch (err) {
      const error = err as AxiosError;
      const code = error?.response?.status;
      fail(err);
      store.getActions().toast.onOpen({
        description: code === 302 ? "Tài khoản đã được đăng kí" : "Đã có lỗi xảy ra",
        type: ToastTypeEnum.WARNING
      });
    } finally {
      actions.setLoading(false);
    }
  }),
  verifyOtp: thunk(async (actions, payload, { fail }) => {
    try {
      actions.setLoading(true);
      const result = await verifyOtp(payload);
      actions.set(result);
      return result;
    } catch (err) {
      fail(err);
    } finally {
      actions.setLoading(false);
    }
  }),
  update: thunk(async (actions, payload, { fail }) => {
    try {
      const result = await updateUser(payload);
      actions.set(result);
    } catch (err) {
      fail(err);
    } finally {
      actions.setLoading(false);
    }
  }),
  onError: thunkOn(
    (actions) => actions.onGetUserByGoogle.successType,
    () => {}
  )
};
