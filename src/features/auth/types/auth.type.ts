export type AuthDef = {
  _id: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  accessToken?: string;
  refreshToken?: string;
};

export type AuthRequest = {
  email: string;
  password: string;
};

export type PlatformAuthRequest = {
  _id: string;
};

export type AuthResponse = {
  data: AuthDef;
  refreshToken?: string;
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
