<template>
  <div class="not-found-container">
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" class="text-center">
          <div class="text-h1 font-weight-bold primary--text">404</div>
          <h1 class="text-h4 mt-4">Página não encontrada</h1>
          <p class="text-body-1 mt-2">
            A página que você está procurando não existe ou foi movida.
          </p>
          <v-btn
            color="primary"
            class="mt-6"
            size="large"
            to="/painel"
          >
            <v-icon start>mdi-home</v-icon>
            Voltar para o Painel
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.not-found-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>