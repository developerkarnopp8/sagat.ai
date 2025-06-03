<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex align-center">
        <h1 class="text-h4">Minhas Contas</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="account in accountsUser" :key="account.id" cols="12" md="4">
        <v-card>
          <v-card-item>
            <template v-slot:prepend>
              <v-avatar color="primary" variant="tonal">
                <v-icon>mdi-bank</v-icon>
              </v-avatar>
            </template>
            <v-card-title>{{ account.bank_name }}</v-card-title>
            <v-card-subtitle>{{ account.account_type }}</v-card-subtitle>
          </v-card-item>

          <v-card-text>
            <div class="d-flex justify-space-between align-center">
              <div>
                <div class="text-caption text-grey">Account Number</div>
                <div class="text-body-1">{{ account.account_number }}</div>
              </div>
              <div class="text-right">
                <div class="text-caption text-grey">Balance</div>
                <div class="text-h5 font-weight-bold">${{ account.amount.toFixed(2) }}</div>
              </div>
            </div>
          </v-card-text>

          <v-divider></v-divider>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex align-center">
        <h1 class="text-h4">Contas Salvas</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="account in accountsAlls" :key="account.id" cols="12" md="4">
        <v-card>
          <v-card-item>
            <template v-slot:prepend>
              <v-avatar color="primary" variant="tonal">
                <v-icon>mdi-bank</v-icon>
              </v-avatar>
            </template>
            <v-card-title>{{ account.bank_name }}</v-card-title>
            <v-card-subtitle>{{ account.account_type }}</v-card-subtitle>
          </v-card-item>

          <v-card-text>
            <div class="d-flex justify-space-between align-center">
              <div>
                <div class="text-caption text-grey">Account Number</div>
                <div class="text-body-1">{{ account.account_number }}</div>
              </div>
              <!-- <div class="text-right">
                <div class="text-caption text-grey">Balance</div>
                <div class="text-h5 font-weight-bold">${{ account.amount.toFixed(2) }}</div>
              </div> -->
            </div>
          </v-card-text>

          <v-divider></v-divider>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { getDataBank, getDataBankAll } from '@/services/contaBancariaService';

import { IDataBanco, IDataBancoAll } from '@/shared/interfaces/IDataBanco';
import { IUserCanvas } from '@/shared/interfaces/ICanvas';

const accountsUser = ref<IDataBanco[]>([]);
const accountsAlls = ref<IDataBancoAll[]>([]);

async function getDataBankUser () {
  const responseUser = await getDataBank();
  const responseAll = await getDataBankAll();

  const userCanvasUser: IUserCanvas = responseUser.data as IUserCanvas;
  const userCanvasAlls: IUserCanvas = responseAll.data as IUserCanvas;
  
  accountsUser.value = userCanvasUser.user_bank_accounts ?? [];
  accountsAlls.value = userCanvasAlls.user_bank_accounts ?? [];
}

onMounted(async () => {
  await getDataBankUser();
})

</script>