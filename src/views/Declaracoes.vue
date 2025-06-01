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
    <v-card>
      <v-data-table
        :headers="headers"
        :items="getTransacoesDeclaracoes"
        :loading="loading"
      >
        <template v-slot:[`item.amount_to_transfer`]="{ item }">
          <span :class="item.amount_to_transfer >= 0 ? 'text-success' : 'text-error'">
            R${{ Math.abs(item.amount_to_transfer).toFixed(2) }}
          </span>
        </template>

        <template v-slot:[`item.was_success`]="{ item }">
          <v-chip
            :color="item.was_success ? 'success' : 'error'"
            size="small"
          >
            {{ item.was_success ? 'Concluído' : 'Falhou' }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>

  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getDataDeclaracoes } from '@/services/transferenciasService';
import { useDeclaracoesStore } from '@/store/declaracoes.store';


const useDeclaraStore = useDeclaracoesStore()

const getTransacoesDeclaracoes = useDeclaraStore.getTransacoesDeclaracoes;
const filters = ref({
  dateFrom: '',
  dateTo: '',
  type: null
});

const headers = [
  { title: 'Data', key: 'created_at' },
  { title: 'Tipo', key: 'transfer_type_text' },
  { title: 'Valor da Transferência', key: 'amount_to_transfer' },
  { title: 'Status', key: 'was_success' }
];

const loading = ref(false);

const getStatusColor = (status: any) => {
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

onMounted( async () => {
  const response = await getDataDeclaracoes({
    start_date      : '',
    end_date        : '',
    min_value       : 0,
    max_value       : 0,
    transfer_type   : '',
    per_page        : '',
    page            : ''
  });
  useDeclaraStore.setallTransacoesDeclaracoes(response || [])
})
</script>