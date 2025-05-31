<template>
  <div class="auth-container">
    <v-card class="auth-card mx-auto" elevation="8">
      <v-card-item>
        <v-card-title class="text-h4 text-center mb-4">Sagat Pay</v-card-title>
      </v-card-item>

      <v-card-text>
        <v-form @submit.prevent="onSubmit">
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            prepend-inner-icon="mdi-email"
            variant="outlined"
            :rules="[v => !!v || 'Email é obrigatório!']"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="Senha"
            prepend-inner-icon="mdi-lock"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPassword = !showPassword"
            variant="outlined"
            :rules="[v => !!v || 'Senha obrigatória!']"
          ></v-text-field>

          <v-btn
            type="submit"
            color="primary"
            block
            size="large"
            class="mt-4"
            :loading="loading"
          >
            Login
          </v-btn>

          <div class="d-flex align-center justify-center mt-6">
            <span>Não tem conta?</span>
            <v-btn variant="text" color="primary" class="ml-2" to="/cadastro">
              Criar Conta
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const loading = ref(false);

const onSubmit = async () => {
  loading.value = true;
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock login - in real app, this would validate against an API
  if (email.value && password.value) {
    router.push('/painel');
  }
  
  loading.value = false;
};
</script>

<style scoped>
.auth-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--v-primary-base) 0%, var(--v-secondary-base) 100%);
}

.auth-card {
  width: 100%;
  max-width: 400px;
  padding: 20px;
}

@media (max-width: 600px) {
  .auth-card {
    margin: 16px;
  }
}
</style>