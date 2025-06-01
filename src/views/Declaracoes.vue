<template>
  <v-container>
    <h1 class="text-h4 mb-6">Transaction Statements</h1>

    <!-- Filters -->
    <v-card class="mb-6">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model="filters.dateFrom"
              label="From Date"
              type="date"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model="filters.dateTo"
              label="To Date"
              type="date"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="filters.type"
              label="Type"
              :items="['PIX', 'TED']"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-btn color="primary" block @click="applyFilters">
              Apply Filters
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Transactions Table -->
    <v-card>
      <v-data-table
        :headers="headers"
        :items="transactions"
        :loading="loading"
      >
        <template v-slot:item.amount="{ item }">
          <span :class="item.amount >= 0 ? 'text-success' : 'text-error'">
            ${{ Math.abs(item.amount).toFixed(2) }}
          </span>
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip
            :color="getStatusColor(item.status)"
            size="small"
          >
            {{ item.status }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const filters = ref({
  dateFrom: '',
  dateTo: '',
  type: null
});

const headers = [
  { title: 'Date', key: 'date' },
  { title: 'Type', key: 'type' },
  { title: 'Amount', key: 'amount' },
  { title: 'Status', key: 'status' }
];

const loading = ref(false);
const transactions = ref([
  {
    date: '2024-03-15',
    type: 'PIX',
    amount: 500.00,
    status: 'completed'
  },
  {
    date: '2024-03-14',
    type: 'TED',
    amount: -1000.00,
    status: 'completed'
  },
  {
    date: '2024-03-13',
    type: 'PIX',
    amount: 250.00,
    status: 'pending'
  }
]);

const getStatusColor = (status) => {
  switch (status) {
    case 'completed': return 'success';
    case 'pending': return 'warning';
    case 'failed': return 'error';
    default: return 'grey';
  }
};

const applyFilters = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 1000);
};
</script>