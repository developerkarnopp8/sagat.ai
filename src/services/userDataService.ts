import axios, { AxiosResponse } from 'axios';
import { nextTick } from 'vue';

import { useUserStore } from '@/store/user.store';
import { useAuthStore } from '@/store/auth.store';
import { IUser } from '@/shared/interfaces/IDataUser';
import { filterError } from '@/plugins/filtersErrors';

const URL = import.meta.env.VITE_BASE_URL_DEV;

const api = axios.create({
  baseURL: URL,
});

export const getDataUser = async (): Promise<AxiosResponse<{user: IUser}>> => {
  const userStore = useUserStore();
  const authStore = useAuthStore();
  authStore.setLoading(true);
    try {
        await nextTick();        
        const res = await api.get('/users/infos', { 
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${authStore.token}`,
              'Cache-Control': 'no-cache',
          }
        });
      
        userStore.setDataUserCanvas(res?.data?.user)
         
        return res.data;

    } catch (error) {
      filterError(error)
      console.error('Erro:', error);
      throw error;
    } finally {
        authStore.setLoading(false);
    }
};
