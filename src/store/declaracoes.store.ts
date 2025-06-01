import { IDeclaracoes } from "@/shared/interfaces/IDeclaracoes";
import { defineStore } from "pinia";

export const useDeclaracoesStore = defineStore('useTransacoes', {
  state: (): { canvas: IDeclaracoes; allTransacoesDeclaracoes: any[] } => ({
    canvas: JSON.parse(localStorage.getItem('canvas') || '{}'),
    allTransacoesDeclaracoes: [],
  }),
  getters: {
      getTransacoesDeclaracoes: (state) => state.allTransacoesDeclaracoes,
  },
  actions: {
    setDeclaracoesCanvas(newData: any) {
      this.canvas = {
        ...this.canvas,
        ...newData,
      };

      localStorage.setItem('canvas', JSON.stringify(this.canvas));
    },

    setallTransacoesDeclaracoes(newData: any) {
      this.allTransacoesDeclaracoes.push(newData);
    },
  },
});
