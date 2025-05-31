import axios, { AxiosResponse } from 'axios';
import { nextTick } from 'vue';
import router from '@/router';

import { UserSignUpPayload, UserSignInPayload, AuthTokenResponse } from '@/shared/interfaces/IAuth';

import { useUserStore } from '@/store/user.store';
import { useAuthStore } from '@/store/auth.store';
import { IUser } from '@/shared/interfaces/IDataUser';

const URL = import.meta.env.VITE_BASE_URL_DEV;

const api = axios.create({
  baseURL: URL,
});

export const getDataUser = async (): Promise<AxiosResponse<{user: IUser}>> => {
  const userStore = useUserStore();
    try {
        await nextTick();
        const authStore = useAuthStore();
        console.log(authStore.token, 'veio token');
        
        const res = await api.get('/users/infos', { 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${authStore.token}`,
                'Cache-Control': 'no-cache',
            }
         });
        
         console.log(res?.data?.user, 'teste');
         userStore.setDataUserCanvas(res?.data?.user)
         
        return res.data;

    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
};
