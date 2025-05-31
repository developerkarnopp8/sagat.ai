import { defineStore } from "pinia";

export const useUserStore = defineStore('useUser', {
    state: () => ({
        canvas: JSON.parse(localStorage.getItem('canvas') || 'null'),
    }),
    actions: {
        setDataUserCanvas(canvas: any) {
            this.canvas = canvas;
            localStorage.setItem('canvas', JSON.stringify(canvas));
        },
    }
});
