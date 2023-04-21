import axios from "axios";
import { api } from "app/api/api";
import { AuthEndpointsEnum } from "app/features/auth/auth";
import { AuthDef } from "app/features/auth/types/auth.type";

export const updateProfile = (data: Partial<AuthDef>) => {
  return api.patch(AuthEndpointsEnum.UPDATE, data);
};
