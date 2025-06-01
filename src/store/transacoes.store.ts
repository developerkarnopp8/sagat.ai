import { IUserCanvas } from "@/shared/interfaces/ICanvas";
import { defineStore } from "pinia";

export const useTransacoesStore = defineStore('useTransacoes', {
  state: (): { canvas: IUserCanvas } => ({
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
