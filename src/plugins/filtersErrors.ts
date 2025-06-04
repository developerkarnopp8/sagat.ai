import router from '@/router';
import { useAuthStore } from "@/store/auth.store";

const authStore = useAuthStore();
export const filterError = (error: any) => {
  switch (error.status) {
    case 401:
      authStore.clearToken();
      router.push('/');
      break;
  }
};
