import { loginByGoogleOrFacebook } from "./../api/auth.api";
import { Action, Thunk, action, thunk, ThunkOn, thunkOn } from "easy-peasy";
import {
  AuthDef,
  AuthRequest,
  AuthResponse,
  LoginByGoogleOrFacebookRequest
} from "../types/auth.type";
import { getUser, getUserByFacebook, getUserByGoogle } from "../api/auth.api";

export interface AuthModel {
  user: AuthDef | null;
  isError: boolean;
  set: Action<AuthModel, AuthResponse>;
  login: Thunk<AuthModel, AuthRequest>;
  onGetUserByGoogle: Thunk<AuthModel, string>;
  onGetUserByFacebook: Thunk<AuthModel, string>;
  loginByGoogleOrFacebook: Thunk<AuthModel, LoginByGoogleOrFacebookRequest>;
  onError: ThunkOn<AuthModel>;
}

const initialState = {
  user: null,
  isError: false
};

export const auth: AuthModel = {
  ...initialState,
  set: action((state, payload) => {
    state.user = {
      ...payload.data,
      refreshToken: payload.refreshToken
    };
  }),
  login: thunk(async (actions, payload) => {
    const user = await getUser(payload);
    actions.set(user);
  }),
  onGetUserByGoogle: thunk(async (actions, payload, { fail }) => {
    try {
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
    }
  }),
  onGetUserByFacebook: thunk(async (actions, payload) => {
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
  }),
  loginByGoogleOrFacebook: thunk(async (actions, payload, { fail }) => {
    try {
      const user = await loginByGoogleOrFacebook(payload);
      actions.set(user);
    } catch (err) {
      fail(err);
    }
  }),
  onError: thunkOn(
    (actions) => actions.onGetUserByGoogle.successType,
    () => {}
  )
};
