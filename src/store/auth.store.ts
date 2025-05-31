import { defineStore } from "pinia";
import { signUp, signIn } from '@/services/authService';
import { AuthTokenResponse, UserSignInPayload, UserSignUpPayload } from "@/shared/interfaces/IAuth";
import { useRouter } from 'vue-router';

const router = useRouter();

export const useAuthStore = defineStore('useAuth', {
    state: () => ({
        token: null as AuthTokenResponse | null,
    }),
    getters: {
        gToken: (state) => state.token,
    },
    actions: {
        async createUser(params: UserSignUpPayload) {
            const response = await signUp(params);
            if(response?.data?.token){
                this.token = response?.data?.token;
                router.push('/painel');
            }
        },

        async accessUser(params: UserSignInPayload) {
            const response = await signIn(params);
            if(response?.data?.token){
                this.token = response?.data?.token;
                console.log(this.token, 'resp');
                router.push('/painel');
            }
        },


        
    }
})