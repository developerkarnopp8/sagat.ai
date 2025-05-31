<template>
  <v-container>
    <v-row>
      <!-- Stats cards -->
      <v-col cols="12" md="4">
        <v-card>
          <v-card-text>
            <div class="text-overline mb-1">Total Balance</div>
            <div class="text-h4">$10,000.00</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-text>
            <div class="text-overline mb-1">Accounts</div>
            <div class="text-h4">3</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card color="primary">
          <v-card-text>
            <div class="text-overline mb-1">Quick Transfer</div>
            <v-btn variant="tonal">
              Transfer Money
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Recent transactions -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Recent Transactions</v-card-title>
          <v-list lines="two">
            <v-list-item
              title="Transfer to Account"
              subtitle="March 15, 2024"
              append-icon="mdi-chevron-right"
            >
              <template v-slot:prepend>
                <v-icon color="primary">mdi-bank-transfer</v-icon>
              </template>
              <template v-slot:append>
                <span class="text-h6">$500.00</span>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <!-- Account summary -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>My Accounts</v-card-title>
          <v-list lines="two">
            <v-list-item
              title="Main Account"
              subtitle="**** 1234"
              append-icon="mdi-chevron-right"
            >
              <template v-slot:prepend>
                <v-icon color="primary">mdi-bank</v-icon>
              </template>
              <template v-slot:append>
                <span class="text-h6">$8,500.00</span>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
// Dashboard logic here
</script>