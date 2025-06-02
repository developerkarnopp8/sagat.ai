import axios, { AxiosResponse } from 'axios';
import { nextTick } from 'vue';
import router from '@/router';

import { UserSignUpPayload, UserSignInPayload, AuthTokenResponse } from '@/shared/interfaces/IAuth';

import { useAuthStore } from '@/store/auth.store';
import { getDataUser } from '@/services/userDataService';
import { getDataBank } from '@/services/contaBancariaService';
import { getDataDeclaracoes } from '@/services/transferenciasService';

const URL = import.meta.env.VITE_BASE_URL_DEV;
const api = axios.create({
  baseURL: URL,
});

export const signUp = async (user: UserSignUpPayload): Promise<AxiosResponse<{token: AuthTokenResponse}>> => {
  const authStore = useAuthStore();  
  authStore.setLoading(true);
    try {
        await nextTick();
        const res = await api.post('/auth/sign_up', { user });
        const tokenAuth = res.data;
        if (tokenAuth.token) {
            authStore.setToken(tokenAuth.token);
            await getDataUser();
            await getDataBank();
            await nextTick();
            router.push('/painel');
        }
        return res;
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
    finally {
        authStore.setLoading(false);
    }
};

export const signIn = async (user: UserSignInPayload): Promise<AxiosResponse<{ token: AuthTokenResponse }>> => {
    const authStore = useAuthStore();
    authStore.setLoading(true);
    try {
        await nextTick();
        const res = await api.put('/auth/sign_in', { user })
        const tokenAuth = res.data;
        if (tokenAuth.token) {
            authStore.setToken(tokenAuth.token);
            await getDataUser();
            await getDataBank();
            await getDataDeclaracoes({
                start_date      : '',
                end_date        : '',
                min_value       : 0,
                max_value       : 0,
                transfer_type   : '',
                per_page        : '',
                page            : ''
            });
            await nextTick();
            router.push('/painel');
        }
        return res;
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    } finally {
       authStore.setLoading(false);
    }
};
