export interface UserSignUpPayload {
  name: string;
  email: string;
  password: string;
}

export interface UserSignInPayload {
  email: string;
  password: string;
}

export interface AuthTokenResponse {
  token: null;
}