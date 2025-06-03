import axios, { AxiosResponse } from 'axios';
import { nextTick } from 'vue';

import { IDeclaracoes, IDeclaracoesFilters } from '../shared/interfaces/IDeclaracoes';
import { useAuthStore } from '@/store/auth.store';

const URL = import.meta.env.VITE_BASE_URL_DEV;

const api = axios.create({
  baseURL: URL,
});

export const getDataDeclaracoes = async (prams: IDeclaracoesFilters) => {

  const authStore = useAuthStore();
  authStore.setLoading(true);

    try {
        await nextTick();
        
        const res = await api.get<IDeclaracoes>(`/users/bank_account_transfers/statements?start_date=${prams.start_date}&end_date=${prams.end_date}&min_value=${prams.min_value}&max_value=${prams.max_value}&transfer_type=${prams.transfer_type}&page=${prams.page}&per_page=${prams.per_page}`, { 
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${authStore.token}`,
              'Cache-Control': 'no-cache',
          }
        });
         
        return res;

    } catch (error) {
        console.error('Erro:', error);
        throw error;
    } finally {
        authStore.setLoading(false);
    }
};
