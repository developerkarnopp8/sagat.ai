<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex align-center">
        <h1 class="text-h4">My Bank Accounts</h1>
        <v-spacer></v-spacer>
        <v-btn color="primary" prepend-icon="mdi-plus" @click="showAddDialog = true">
          Add Account
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="account in accounts" :key="account.id" cols="12" md="4">
        <v-card>
          <v-card-item>
            <template v-slot:prepend>
              <v-avatar color="primary" variant="tonal">
                <v-icon>mdi-bank</v-icon>
              </v-avatar>
            </template>
            <v-card-title>{{ account.bankName }}</v-card-title>
            <v-card-subtitle>{{ account.accountType }}</v-card-subtitle>
          </v-card-item>

          <v-card-text>
            <div class="d-flex justify-space-between align-center">
              <div>
                <div class="text-caption text-grey">Account Number</div>
                <div class="text-body-1">{{ account.accountNumber }}</div>
              </div>
              <div class="text-right">
                <div class="text-caption text-grey">Balance</div>
                <div class="text-h5 font-weight-bold">${{ account.balance.toFixed(2) }}</div>
              </div>
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn variant="text" color="primary" @click="editAccount(account)">
              <v-icon start>mdi-pencil</v-icon>
              Edit
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn variant="text" color="error" @click="deleteAccount(account)">
              <v-icon start>mdi-delete</v-icon>
              Remove
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Add/Edit Account Dialog -->
    <v-dialog v-model="showAddDialog" max-width="500px">
      <v-card>
        <v-card-title>{{ editingAccount ? 'Edit Account' : 'Add New Account' }}</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveAccount">
            <v-text-field
              v-model="accountForm.bankName"
              label="Bank Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="accountForm.accountNumber"
              label="Account Number"
              required
            ></v-text-field>
            <v-select
              v-model="accountForm.accountType"
              :items="['Checking', 'Savings', 'Investment']"
              label="Account Type"
              required
            ></v-select>
            <v-text-field
              v-model="accountForm.balance"
              label="Initial Balance"
              type="number"
              prefix="$"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" variant="text" @click="showAddDialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="saveAccount">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Account {
  id: number;
  bankName: string;
  accountNumber: string;
  accountType: string;
  balance: number;
}

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

const showAddDialog = ref(false);
const editingAccount = ref<Account | null>(null);
const accountForm = ref<Omit<Account, 'id'>>({
  bankName: '',
  accountNumber: '',
  accountType: '',
  balance: 0
});

const editAccount = (account: Account) => {
  editingAccount.value = account;
  accountForm.value = { ...account };
  showAddDialog.value = true;
};

const deleteAccount = (account: Account) => {
  accounts.value = accounts.value.filter(a => a.id !== account.id);
};

const saveAccount = () => {
  if (editingAccount.value !== null) {
    const index = accounts.value.findIndex(a => a.id === editingAccount.value!.id);
    if (index !== -1) {
      accounts.value[index] = { ...accountForm.value, id: editingAccount.value!.id };
    }
  } else {
    accounts.value.push({
      ...accountForm.value,
      id: accounts.value.length + 1
    });
  }
  showAddDialog.value = false;
  editingAccount.value = null;
  accountForm.value = {
    bankName: '',
    accountNumber: '',
    accountType: '',
    balance: 0
  };
};
</script>