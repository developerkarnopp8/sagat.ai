<template>
  <v-container>
    <v-row>
      <!-- Bank Accounts -->
      <v-col v-for="account in userStore?.canvas?.user_bank_accounts" :key="account.id" cols="12" md="6">
        <v-card>
          <v-card-item>
            <template v-slot:prepend>
              <v-avatar color="primary" size="large">
                <span class="text-h5 text-white">{{ account.holder_name.charAt(0) }}</span>
              </v-avatar>
            </template>
            <v-card-title>
              {{ account.bank_name }}
              <div class="text-subtitle-1 text-grey">
                Agencia: {{ account.agency_number }}-{{ account.agency_digit }} | 
                Conta: {{ account.account_number }}-{{ account.account_digit }}
              </div>
            </v-card-title>
          </v-card-item>

          <v-card-text>
            <div class="text-h4 mb-2">R${{ account.amount.toFixed(2) }}</div>
            <div class="text-subtitle-1 text-grey">
              {{ account.account_type.charAt(0).toUpperCase() + account.account_type.slice(1) }} conta
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn
              variant="text"
              color="primary"
              prepend-icon="mdi-bank-transfer"
              to="/transferencia"
            >
              Transferências
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              variant="text"
              color="primary"
              prepend-icon="mdi-text-box-multiple"
              to="/declaracoes"
            >
              Declarações
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card>
          <v-card-title>Ações rápidas</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6" md="3">
                <v-btn
                  block
                  color="primary"
                  variant="outlined"
                  prepend-icon="mdi-bank-transfer"
                  to="/transferencia"
                >
                  Transferências
                </v-btn>
              </v-col>
              <v-col cols="6" md="3">
                <v-btn
                  block
                  color="primary"
                  variant="outlined"
                  prepend-icon="mdi-text-box-multiple"
                  to="/declaracoes"
                >
                  Declarações
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex align-center">
            Transações recentes
            <v-spacer></v-spacer>
            <v-btn
              variant="text"
              color="primary"
              to="/statements"
              prepend-icon="mdi-chevron-right"
            >
              Ver tudo
            </v-btn>
          </v-card-title>

          <v-list lines="two">
            <v-list-item
              v-for="transaction in recentTransactions"
              :key="transaction.id"
              :title="transaction.description"
              :subtitle="transaction.date"
            >
              <template v-slot:prepend>
                <v-icon :color="transaction.amount > 0 ? 'success' : 'error'">
                  {{ transaction.amount > 0 ? 'mdi-bank-transfer-in' : 'mdi-bank-transfer-out' }}
                </v-icon>
              </template>
              <template v-slot:append>
                <span :class="transaction.amount > 0 ? 'text-success' : 'text-error'">
                  {{ transaction.amount > 0 ? '+' : '-' }}R${{ Math.abs(transaction.amount).toFixed(2) }}
                </span>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth.store';
import { useUserStore } from '@/store/user.store';

const authStore = useAuthStore();
const userStore = useUserStore();

const recentTransactions = ref([
  {
    id: 1,
    description: 'Received from Jane Smith',
    amount: 250.00,
    date: '2024-03-15',
    type: 'credit'
  },
  {
    id: 2,
    description: 'Payment to John Doe',
    amount: -100.00,
    date: '2024-03-14',
    type: 'debit'
  },
  {
    id: 3,
    description: 'Salary Deposit',
    amount: 3000.00,
    date: '2024-03-13',
    type: 'credit'
  }
]);
</script>