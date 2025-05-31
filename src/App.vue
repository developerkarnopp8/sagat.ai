<template>
  <v-app>
    <!-- App bar -->
    <v-app-bar color="primary" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Sagat Pay</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn to="/perfil" icon>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Navigation drawer -->
    <v-navigation-drawer v-model="drawer" app>
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
        <v-list-item to="/accounts" prepend-icon="mdi-bank" title="My Accounts"></v-list-item>
        <v-list-item to="/transfer" prepend-icon="mdi-bank-transfer" title="Transfer Money"></v-list-item>
        <v-list-item to="/statements" prepend-icon="mdi-text-box-multiple" title="Statements"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main content -->
    <v-main>
      <router-view />
    </v-main>

    <!-- Bottom navigation for mobile -->
    <v-bottom-navigation>
      <v-btn to="/painel">
        <v-icon>mdi-view-dashboard</v-icon>
        Painel
      </v-btn>
      <v-btn to="/accounts">
        <v-icon>mdi-bank</v-icon>
        Accounts
      </v-btn>
      <v-btn to="/transfer">
        <v-icon>mdi-bank-transfer</v-icon>
        Transfer
      </v-btn>
      <v-btn to="/statements">
        <v-icon>mdi-text-box-multiple</v-icon>
        Statements
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const drawer = ref(false);
import { useUserStore } from '@/store/user.store';

import gustavoAvatar from '@/assets/gustavo_karnopp.jpeg';

const userStore = useUserStore();
</script>