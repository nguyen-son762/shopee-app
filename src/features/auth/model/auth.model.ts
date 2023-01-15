import { Action, Thunk, action, thunk, ThunkOn, thunkOn } from "easy-peasy";
import { AuthDef, AuthRequest, AuthResponse } from "../types/auth.type";
import { getUser, getUserByFacebook, getUserByGoogle } from "../api/auth.api";

export interface AuthModel {
  user: AuthDef | null;
  set: Action<AuthModel, AuthResponse>;
  login: Thunk<AuthModel, AuthRequest>;
  loginWithGoogle: Thunk<AuthModel, string>;
  loginWithFacebook: Thunk<AuthModel, string>;
  onError: ThunkOn<AuthModel>;
}

const initialState = {
  user: null
};

export const auth: AuthModel = {
  ...initialState,
  set: action((state, payload) => {
    state.user = {
      ...payload.data,
      refreshToken: payload.refreshToken
    };
  }),
  login: thunk(async (_, payload) => {
    await getUser(payload);
  }),
  onError: thunkOn(
    (actions) => actions.login.successType,
    () => {
      console.log("error ne");
    }
  ),
  loginWithGoogle: thunk(async (_, payload) => {
    const googleUser = await getUserByGoogle(payload);
    console.log(googleUser);
  }),
  loginWithFacebook: thunk(async (_, payload) => {
    const user = await getUserByFacebook(payload);
    console.log(user);
  })
};
