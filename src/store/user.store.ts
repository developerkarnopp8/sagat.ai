import { IUserCanvas } from "@/shared/interfaces/ICanvas";
import { defineStore } from "pinia";

export const useUserStore = defineStore('useUser', {
  state: (): { canvas: IUserCanvas } => ({
    canvas: JSON.parse(localStorage.getItem('canvas') || '{}'),
  }),
  getters: {
      // isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setDataUserCanvas(newData: any) {

      this.canvas = {
        ...this.canvas,
        ...newData,
      };

      localStorage.setItem('canvas', JSON.stringify(this.canvas));
    },
  },
});
