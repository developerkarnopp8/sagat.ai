import axios, { AxiosResponse } from 'axios';
import { nextTick } from 'vue';

import { useDtaBancoStore } from '@/store/conta.bancaria.store';
import { useAuthStore } from '@/store/auth.store';
import { IDataBanco } from '@/shared/interfaces/IDataBanco';

const URL = import.meta.env.VITE_BASE_URL_DEV;

const api = axios.create({
  baseURL: URL,
});

export const getDataBank = async (): Promise<AxiosResponse<{data: IDataBanco}>> => {
  const useBancoStore = useDtaBancoStore();
    try {
        await nextTick();
        const authStore = useAuthStore();
        
        const res = await api.get('/users/bank_accounts/my', { 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${authStore.token}`,
                'Cache-Control': 'no-cache',
            }
         });
        
         useBancoStore.setDataBancoCanvas(res?.data)
         
        return res.data;

    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
};
