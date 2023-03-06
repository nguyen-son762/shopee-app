import { Action, action } from "easy-peasy";
import { ToastTypeEnum } from "./toast.type";

const initialState = {
  show: false,
  description: "",
  type: ToastTypeEnum.INFO
};

export interface ToastModel {
  show: boolean;
  description: string;
  type: ToastTypeEnum;
  onOpen: Action<
    ToastModel,
    {
      description: string;
      type: ToastTypeEnum;
    }
  >;
  onClose: Action<ToastModel>;
}

export const toast: ToastModel = {
  ...initialState,
  onOpen: action((state, payload) => {
    state.show = true;
    state.description = payload.description;
    state.type = payload.type;
  }),
  onClose: action((state) => {
    state.description = "";
    state.type = ToastTypeEnum.INFO;
    state.show = false;
  })
};
