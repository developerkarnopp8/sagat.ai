<template>
  <v-container>
    <h1 class="text-h4 mb-6">Declarações de transação</h1>
    <v-card class="mb-6">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="2">
            <v-text-field
              v-model="filters.dateFrom"
              label="a partir da data"
              type="date"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-text-field
              v-model="filters.dateTo"
              label="até a data"
              type="date"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-text-field
              v-model="filters.min_value"
              label="Valor mínimo"
              type="number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-text-field
              v-model="filters.max_value"
              label="Valor máximo"
              type="number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-select
              v-model="filters.type"
              label="Tipo tranferência"
              :items="transfer_type"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-btn color="primary" block @click="applyFilters">
              Filtrar
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
        :items-per-page="filters.per_page"
        :page="filters.page"
        :server-items-length="meta.total_records"
        @update:page="(val) => { filters.page = val; applyFilters(); }"
        @update:items-per-page="(val) => { filters.per_page = val === -1 ? meta.total_records : val; filters.page = 1; applyFilters();}"
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
import { onMounted, ref, computed } from 'vue';

import { filterDate } from '@/plugins/filters';

import { getDataDeclaracoes } from '@/services/transferenciasService';

import { IDeclaracoes } from '@/shared/interfaces/IDeclaracoes';

import { useDeclaracoesStore } from '@/store/declaracoes.store';

const useDeclaraStore = useDeclaracoesStore()

const getTransacoesDeclaracoes = computed(() => useDeclaraStore.getTransacoesDeclaracoes);

const meta = computed(() => useDeclaraStore.meta);

const filters = ref({
  dateFrom  : '',
  dateTo    : '',
  type      : '',
  min_value : '',
  max_value : '',
  page      : 1,
  per_page  : 5
});

const headers = [
  { title: 'Data', key: 'created_at', value: (item: any) => filterDate(item.created_at) },
  { title: 'Tipo', key: 'transfer_type_text' },
  { title: 'Valor da Transferência', key: 'amount_to_transfer' },
  { title: 'Status', key: 'was_success' }
];

const transfer_type = [
  { title: 'ENVIADA', key: 'send' },
  { title: 'RECEBIDAS', key: 'received' },
];

const loading = ref(false);

const applyFilters = async () => {
  loading.value = true;

  try {
    const response = await getDataDeclaracoes({
      start_date    : filters.value.dateFrom  || '',
      end_date      : filters.value.dateTo    || '',
      min_value     : filters.value.min_value || '',
      max_value     : filters.value.max_value || '',
      transfer_type : filters.value.type      || '',
      per_page      : filters.value.per_page.toString(),
      page          : filters.value.page.toString()
    });

    const declaracoes: IDeclaracoes = response.data;
    useDeclaraStore.setallTransacoesDeclaracoes(declaracoes, false);
  } catch (err) {
    console.error('Erro ao aplicar filtros:', err);
  } finally {
    loading.value = false;
  }
};


onMounted( async () => {
  loading.value = true;
  try {
    const response = await getDataDeclaracoes({
      start_date    : '',
      end_date      : '',
      min_value     : '',
      max_value     : '',
      transfer_type : '',
      per_page      : '',
      page          : ''
    });

    const declaracoes: IDeclaracoes = response.data; 
    useDeclaraStore.setallTransacoesDeclaracoes(declaracoes, false);
  } catch (err) {
    console.error('Erro ao carregar transações:', err);
  } finally {
    loading.value = false;
  }
})
</script>