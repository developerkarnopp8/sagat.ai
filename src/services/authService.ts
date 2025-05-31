import axios, { AxiosResponse } from 'axios';

import { UserSignUpPayload, UserSignInPayload, AuthTokenResponse } from '@/shared/interfaces/IAuth';
import { nextTick } from 'vue';
import router from '@/router';
import { useAuthStore } from '@/store/auth.store';

const URL = import.meta.env.VITE_BASE_URL_DEV;

console.log(URL, 'teste');

const api = axios.create({
  baseURL: URL,
});

export const signUp = async (user: UserSignUpPayload): Promise<AxiosResponse<{token: AuthTokenResponse}>> => {
  return await api.post('/auth/sign_up', { user });
};

export const signIn = async (user: UserSignInPayload): Promise<AxiosResponse<{ token: AuthTokenResponse }>> => {
    const authStore = useAuthStore();
    try {

        await nextTick();
        
        const res = await api.put('/auth/sign_in', { user })

        const tokenAuth = res.data;
        
        if (tokenAuth.token) {
            authStore.setToken(tokenAuth.token);
            await nextTick();
            router.push('/painel');
        }
        
        return res;

    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
};
