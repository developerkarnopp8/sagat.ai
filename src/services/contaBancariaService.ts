import axios, { AxiosResponse } from 'axios';
import { nextTick } from 'vue';

import { useDtaBancoStore } from '@/store/conta.bancaria.store';
import { useAuthStore } from '@/store/auth.store';
import { IDataBanco } from '@/shared/interfaces/IDataBanco';
import { filterError } from '@/plugins/filtersErrors';

const URL = import.meta.env.VITE_BASE_URL_DEV;

const api = axios.create({
  baseURL: URL,
});

export const getDataBank = async (): Promise<AxiosResponse<{data: IDataBanco}>> => {
  const useBancoStore = useDtaBancoStore();
  const authStore = useAuthStore();
  authStore.setLoading(true);
    try {
        await nextTick();
        
        const res = await api.get('/users/bank_accounts/my', { 
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${authStore.token}`,
              'Cache-Control': 'no-cache',
          }
        });
        
        useBancoStore.setDataBancoCanvas(res?.data)
         
        return res;

    } catch (error) {
        console.error('Erro:', error);
        throw error;
    } finally {
        authStore.setLoading(false);
    }
};

export const getDataBankAll = async (): Promise<AxiosResponse<{data: IDataBanco}>> => {
  const authStore = useAuthStore();
  authStore.setLoading(true);
    try {
        await nextTick();
        
        const res = await api.get('/users/bank_accounts', { 
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${authStore.token}`,
              'Cache-Control': 'no-cache',
          }
        });
                 
        return res;

    } catch (error) {
      filterError(error)
      console.error('Erro:', error);
      throw error;
    } finally {
        authStore.setLoading(false);
    }
};
