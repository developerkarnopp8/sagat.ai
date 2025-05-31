<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
// import api from '../../services/api';
import { useNotificationsStore } from '@/store/notifications.store';

const route = useRoute();
const router = useRouter();
const notificationsStore = useNotificationsStore();

const isEditing = computed(() => !!route.params.id);
const loading = ref(false);
const bankAccount = ref({
  bank_name: '',
  account_number: '',
  account_type: '',
  balance: 0,
});

// Form validation schema
const schema = yup.object({
  bank_name: yup.string().required('Bank name is required'),
  account_number: yup.string().required('Account number is required'),
  account_type: yup.string().required('Account type is required'),
  balance: yup.number().required('Initial balance is required').min(0, 'Balance must be positive'),
});

const { handleSubmit, errors, setFieldValue } = useForm({
  validationSchema: schema,
  initialValues: bankAccount.value,
});

// Account types options
const accountTypes = [
  'Checking',
  'Savings',
  'Investment',
  'Credit Card',
  'Loan',
];

// Fetch account data if editing
onMounted(async () => {
  if (isEditing.value) {
    try {
      loading.value = true;
    //   const response = await api.get(`/users/bank_accounts/${route.params.id}`);
    //   bankAccount.value = response.data;
      
      // Set form values
      (Object.keys(bankAccount.value) as Array<keyof typeof bankAccount.value>).forEach((key) => {
        setFieldValue(key, bankAccount.value[key]);
      });
    } catch (error) {
      notificationsStore.showNotification({
        text: 'Failed to load bank account details',
        color: 'error',
      });
      router.push('/accounts');
    } finally {
      loading.value = false;
    }
  }
});

// Submit form
const onSubmit = handleSubmit(async (values: any) => {
  try {
    loading.value = true;
    
    // Uncomment and use your API logic here
    // if (isEditing.value) {
    //   await api.put(`/users/bank_accounts/${route.params.id}`, values);
    //   notificationsStore.showNotification({
    //     text: 'Bank account updated successfully',
    //     color: 'success',
    //   });
    // } else {
    //   await api.post('/users/bank_accounts', values);
    //   notificationsStore.showNotification({
    //     text: 'Bank account created successfully',
    //     color: 'success',
    //   });
    // }
    
    router.push('/accounts');
  } catch (error) {
    notificationsStore.showNotification({
      text: `Failed to ${isEditing.value ? 'update' : 'create'} bank account`,
      color: 'error',
    });
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="form-container">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h5 py-4">
            {{ isEditing ? 'Edit Bank Account' : 'Add New Bank Account' }}
          </v-card-title>
          
          <v-divider></v-divider>
          
          <v-card-text class="py-4">
            <!-- Loading skeleton -->
            <div v-if="loading && isEditing">
              <v-skeleton-loader type="article"></v-skeleton-loader>
            </div>
            
            <!-- Form -->
            <v-form @submit.prevent="onSubmit" v-else>
              <v-text-field
                v-model="bankAccount.bank_name"
                label="Bank Name"
                variant="outlined"
                prepend-inner-icon="mdi-bank"
                :error-messages="errors.bank_name"
                required
              ></v-text-field>
              
              <v-text-field
                v-model="bankAccount.account_number"
                label="Account Number"
                variant="outlined"
                prepend-inner-icon="mdi-pound"
                :error-messages="errors.account_number"
                required
              ></v-text-field>
              
              <v-select
                v-model="bankAccount.account_type"
                :items="accountTypes"
                label="Account Type"
                variant="outlined"
                prepend-inner-icon="mdi-credit-card-outline"
                :error-messages="errors.account_type"
                required
              ></v-select>
              
              <v-text-field
                v-model="bankAccount.balance"
                label="Initial Balance"
                variant="outlined"
                type="number"
                prepend-inner-icon="mdi-cash"
                prefix="$"
                :error-messages="errors.balance"
                :disabled="isEditing"
                :hint="isEditing ? 'Balance cannot be edited directly' : ''"
                persistent-hint
                required
              ></v-text-field>
              
              <div class="d-flex justify-end mt-6 gap-3">
                <v-btn
                  variant="outlined"
                  color="error"
                  @click="router.push('/accounts')"
                >
                  Cancel
                </v-btn>
                
                <v-btn
                  type="submit"
                  color="primary"
                  :loading="loading"
                >
                  {{ isEditing ? 'Update Account' : 'Create Account' }}
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 24px auto;
  padding: 0 16px;
}
</style>