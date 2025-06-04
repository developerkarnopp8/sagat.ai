import { IUserCanvas } from "@/shared/interfaces/ICanvas";
import { defineStore } from "pinia";

export const useDtaBancoStore = defineStore('useDataBanco', {
  state: (): { canvas: IUserCanvas } => ({
    canvas: JSON.parse(localStorage.getItem('canvas') || '{}'),
  }),
  getters: {
      userBanks: (state) => state.canvas.user_bank_accounts,
  },
  actions: {
    setDataBancoCanvas(newData: any) {
      this.canvas = {
        ...this.canvas,
        ...newData,
      };

      localStorage.setItem('canvas', JSON.stringify(this.canvas));
    },
  },
});
