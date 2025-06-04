<template>
  <v-container>
    <h1 class="text-h4 mb-6">Transferir dinheiro</h1>
    
    <v-card class="mx-auto" max-width="600">
      <v-card-text>
        <v-form @submit.prevent="onSubmit">
          <v-select
            v-model="sourceAccount"
            label="Da conta"
            prepend-inner-icon="mdi-bank-transfer-out"
            :items="accountsUser"
            item-title="bank_name"
            item-value="id"
            return-object
          ></v-select>

          <v-select
            v-model="destinationAccount"
            label="Para conta"
            prepend-inner-icon="mdi-bank-transfer-in"
            :items="accountsAlls.filter(a => a.id !== sourceAccount?.id)"
            item-title="bank_name"
            item-value="id"
            return-object
            :disabled="!sourceAccount"
          ></v-select>

          <v-text-field
            v-model="amount"
            label="Valor"
            prepend-inner-icon="mdi-cash"
            prefix="R$"
            type="number"
            :disabled="!sourceAccount || !destinationAccount"
          ></v-text-field>

          <v-radio-group v-model="transferType" inline>
            <v-radio label="PIX (Instantâneo)" value="pix"></v-radio>
            <v-radio label="TED (Mesmo Dia)" value="ted"></v-radio>
          </v-radio-group>

          <v-btn 
            type="submit" 
            color="primary" 
            block
            :disabled="!sourceAccount || !destinationAccount || !amount"
          >
            Transferir dinheiro
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <v-dialog v-model="showSuccessDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h5">
          <v-icon color="success" class="mr-2">mdi-check-circle</v-icon>
          Transferência bem-sucedida
        </v-card-title>
        <v-card-text>
          <p>Sua transferência foi processada com sucesso!</p>
          <v-list>
            <v-list-item>
              <v-list-item-title>Valor</v-list-item-title>
              <v-list-item-subtitle>${{ amount }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>De</v-list-item-title>
              <v-list-item-subtitle>{{ sourceAccount?.bank_name }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Para</v-list-item-title>
              <v-list-item-subtitle>{{ destinationAccount?.bank_name }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="closeSuccessDialog">Feito</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { getDataBank, getDataBankAll } from '@/services/contaBancariaService';
import { IUserCanvas } from '@/shared/interfaces/ICanvas';
import { IDataBanco, IDataBancoAll } from '@/shared/interfaces/IDataBanco';
import { onMounted, ref } from 'vue';

const loading = ref(false);

const accountsUser = ref<IDataBanco[]>([]);
const accountsAlls = ref<IDataBancoAll[]>([]);

const sourceAccount = ref<IDataBanco | null>(null);
const destinationAccount = ref<IDataBancoAll | null>(null);
const amount = ref('');
const transferType = ref('pix');
const showSuccessDialog = ref(false);

const onSubmit = () => {
  showSuccessDialog.value = true;
};

const closeSuccessDialog = () => {
  showSuccessDialog.value = false;
  sourceAccount.value = null;
  destinationAccount.value = null;
  amount.value = '';
  transferType.value = 'pix';
};


async function getDataBankUser () {
  loading.value = true;
  try {
    const responseUser = await getDataBank();
    const responseAll = await getDataBankAll();
  
    const userCanvasUser: IUserCanvas = responseUser.data as IUserCanvas;
    const userCanvasAlls: IUserCanvas = responseAll.data as IUserCanvas;
    
    accountsUser.value = userCanvasUser.user_bank_accounts ?? [];
    accountsAlls.value = userCanvasAlls.user_bank_accounts ?? [];
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  await getDataBankUser();
})
</script>