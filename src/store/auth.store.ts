import { defineStore } from "pinia";

export const useAuthStore = defineStore('useAuth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        isLoading: true
    }),
     getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        setToken(token: string) {
            this.token = token;
            localStorage.setItem('token', token);
        },
        clearToken() {
            this.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('canvas');
        },
        setLoading(value: boolean) {
            this.isLoading = value;
        }
    }
});
