<template>
  <v-container>
    <h1 class="text-h4 mb-6">Transfer Money</h1>
    
    <v-card class="mx-auto" max-width="600">
      <v-card-text>
        <v-form @submit.prevent="onSubmit">
          <v-select
            v-model="sourceAccount"
            label="From Account"
            prepend-inner-icon="mdi-bank-transfer-out"
            :items="accounts"
            item-title="bankName"
            item-value="id"
            return-object
          ></v-select>

          <v-select
            v-model="destinationAccount"
            label="To Account"
            prepend-inner-icon="mdi-bank-transfer-in"
            :items="accounts.filter(a => a.id !== sourceAccount?.id)"
            item-title="bankName"
            item-value="id"
            return-object
            :disabled="!sourceAccount"
          ></v-select>

          <v-text-field
            v-model="amount"
            label="Amount"
            prepend-inner-icon="mdi-cash"
            prefix="$"
            type="number"
            :disabled="!sourceAccount || !destinationAccount"
          ></v-text-field>

          <v-radio-group v-model="transferType" inline>
            <v-radio label="PIX (Instant)" value="pix"></v-radio>
            <v-radio label="TED (Same Day)" value="ted"></v-radio>
          </v-radio-group>

          <v-btn 
            type="submit" 
            color="primary" 
            block
            :disabled="!sourceAccount || !destinationAccount || !amount"
          >
            Transfer Money
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <!-- Success Dialog -->
    <v-dialog v-model="showSuccessDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h5">
          <v-icon color="success" class="mr-2">mdi-check-circle</v-icon>
          Transfer Successful
        </v-card-title>
        <v-card-text>
          <p>Your transfer has been processed successfully!</p>
          <v-list>
            <v-list-item>
              <v-list-item-title>Amount</v-list-item-title>
              <v-list-item-subtitle>${{ amount }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>From</v-list-item-title>
              <v-list-item-subtitle>{{ sourceAccount?.bankName }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>To</v-list-item-title>
              <v-list-item-subtitle>{{ destinationAccount?.bankName }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="closeSuccessDialog">Done</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

type Account = {
  id: number;
  bankName: string;
  accountNumber: string;
  accountType: string;
  balance: number;
};

const accounts = ref<Account[]>([
  {
    id: 1,
    bankName: 'Main Bank',
    accountNumber: '1234567890',
    accountType: 'Checking',
    balance: 5000.00
  },
  {
    id: 2,
    bankName: 'Savings Bank',
    accountNumber: '0987654321',
    accountType: 'Savings',
    balance: 10000.00
  }
]);

const sourceAccount = ref<Account | null>(null);
const destinationAccount = ref<Account | null>(null);
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
</script>