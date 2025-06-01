import axios, { AxiosResponse } from 'axios';
import { nextTick } from 'vue';

import { useTransacoesStore } from '@/store/transacoes.store';
import { ITransacoes } from '@/shared/interfaces/ITransacoes';
import { useAuthStore } from '@/store/auth.store';

const URL = import.meta.env.VITE_BASE_URL_DEV;

const api = axios.create({
  baseURL: URL,
});

export const getDataTransferencias = async (): Promise<AxiosResponse<{data: ITransacoes}>> => {
  console.log('bateu');
  
  const useTransacoes = useTransacoesStore();
    try {
        await nextTick();
        const authStore = useAuthStore();
        
        const res = await api.get('/users/bank_account_transfers/statements', { 
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${authStore.token}`,
              'Cache-Control': 'no-cache',
          }
        });
        
        console.log('chamou 2');
        useTransacoes.setTransacoesCanvas(res?.data)
         
        return res.data;

    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
};
