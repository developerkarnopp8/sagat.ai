import { IUserCanvas } from "@/shared/interfaces/ICanvas";
import { ITransacoes } from "@/shared/interfaces/ITransacoes";
import { defineStore } from "pinia";

export const useTransacoesStore = defineStore('useTransacoes', {
  state: (): { canvas: ITransacoes } => ({
    canvas: JSON.parse(localStorage.getItem('canvas') || '{}'),
  }),
  actions: {
    setTransacoesCanvas(newData: any) {
      this.canvas = {
        ...this.canvas,
        ...newData,
      };

      localStorage.setItem('canvas', JSON.stringify(this.canvas));
    },
  },
});
