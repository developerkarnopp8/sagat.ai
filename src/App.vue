<template>
  <v-app>
    <v-progress-linear
      v-if="authStore.isLoading"
      indeterminate
      color="primary"
    />
    <v-app-bar color="primary" app v-if="authStore.isAuthenticated">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Sagat Pay</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn to="/perfil" icon>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app v-if="authStore.isAuthenticated">
      <v-list>
        <v-list-item
            :prepend-avatar="gustavoAvatar"
          :title="userStore?.canvas?.name"
          :subtitle="userStore?.canvas?.email"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item to="/painel" prepend-icon="mdi-view-dashboard" title="Painel"></v-list-item>
        <v-list-item to="/conta" prepend-icon="mdi-bank" title="Minhas Contas"></v-list-item>
        <v-list-item to="/transferencia" prepend-icon="mdi-bank-transfer" title="Transferências"></v-list-item>
        <v-list-item to="/declaracoes" prepend-icon="mdi-text-box-multiple" title="Declarações"></v-list-item>
        <v-list-item to="/" @click="logout()" prepend-icon="mdi-logout" title="Sair"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>

    <v-bottom-navigation v-if="authStore.isAuthenticated">
      <v-btn to="/painel">
        <v-icon>mdi-view-dashboard</v-icon>
        Painel
      </v-btn>
      <v-btn to="/conta">
        <v-icon>mdi-bank</v-icon>
        Contas
      </v-btn>
      <v-btn to="/transferencia">
        <v-icon>mdi-bank-transfer</v-icon>
        Transferências
      </v-btn>
      <v-btn to="/declaracoes">
        <v-icon>mdi-text-box-multiple</v-icon>
        Declarações
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
const drawer = ref(false);
import gustavoAvatar from '@/assets/gustavo_karnopp.jpeg';

import { useUserStore } from '@/store/user.store';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const userStore = useUserStore();

const router = useRouter();

const logout = (): void => {
    authStore.clearToken();
}

</script>