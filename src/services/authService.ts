import axios, { AxiosResponse } from 'axios';

import { UserSignUpPayload, UserSignInPayload, AuthTokenResponse } from '@/shared/interfaces/IAuth';

const URL = import.meta.env.VITE_BASE_URL_DEV;

console.log(URL, 'teste');

const api = axios.create({
  baseURL: URL,
});

export const signUp = async (user: UserSignUpPayload): Promise<AxiosResponse<{token: AuthTokenResponse}>> => {
  return await api.post('/auth/sign_up', { user });
};

export const signIn = async (user: UserSignInPayload): Promise<AxiosResponse<{ token: AuthTokenResponse }>> => {
  return await api.put('/auth/sign_in', { user });
};
