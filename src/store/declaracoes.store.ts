import { IDeclaracoes, IDeclaracoesTranferencia } from "@/shared/interfaces/IDeclaracoes";
import { defineStore } from "pinia";

export const useDeclaracoesStore = defineStore('useTransacoes', {
  state: (): { 
    canvas: IDeclaracoes; 
    allTransacoesDeclaracoes: IDeclaracoesTranferencia[]; 
    meta: { current_page: number; per_page: number; total_pages: number; total_records: number } 
  } => ({
    canvas: JSON.parse(localStorage.getItem('canvas') || '{}'),
    allTransacoesDeclaracoes: [],
    meta: {
      current_page: 1,
      per_page: 10,
      total_pages: 1,
      total_records: 0,
    }
  }),
  getters: {
      getTransacoesDeclaracoes: (state) => state.allTransacoesDeclaracoes,
  },
  actions: {
    setDeclaracoesCanvas(newData: IDeclaracoes) {
      this.canvas = {
        ...this.canvas,
        ...newData,
      };

      console.log('HAMOU', this.canvas);
      
      localStorage.setItem('canvas', JSON.stringify(this.canvas));
    },

    setallTransacoesDeclaracoes(newData: IDeclaracoes, append = false) {
      this.allTransacoesDeclaracoes = append
        ? [...this.allTransacoesDeclaracoes, ...newData.bank_account_transfers]
        : [...newData.bank_account_transfers];

      this.meta = {
        current_page: newData.current_page,
        per_page: newData.per_page,
        total_pages: newData.total_pages,
        total_records: newData.total_records,
      };
    }


  },
});
