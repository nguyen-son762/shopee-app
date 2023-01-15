import { createStore, createTypedHooks } from "easy-peasy";
import model, { StoreModel } from "./models";

const store = createStore<StoreModel>(model);

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export default store;
