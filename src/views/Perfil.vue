<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/store/user.store';
import { useNotificationsStore } from '@/store/notifications.store';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const userStore = useUserStore();
const notificationsStore = useNotificationsStore();
const loading = ref(false);
const editMode = ref(false);

// Form validation schema
const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required').email('Email must be valid'),
  currentPassword: yup.string().when('$isChangingPassword', {
    is: true,
    then: () => yup.string().required('Current password is required'),
  }),
  newPassword: yup.string().when('$isChangingPassword', {
    is: true,
    then: () => yup.string()
      .required('New password is required')
      .min(6, 'Password must be at least 6 characters'),
  }),
  confirmPassword: yup.string().when('$isChangingPassword', {
    is: true,
    then: () => yup.string()
      .required('Please confirm your password')
      .oneOf([yup.ref('newPassword')], 'Passwords must match'),
  }),
});

const { handleSubmit, errors, setFieldValue, values } = useForm({
  validationSchema: schema,
  initialValues: {
    name: userStore?.canvas?.name || '',
    email: userStore?.canvas?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  }
});

// Password visibility toggles
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

// Whether user is changing password
const isChangingPassword = ref(false);

// Toggle edit mode
const toggleEditMode = () => {
  if (editMode.value) {
    // Reset form when canceling edit
    setFieldValue('name', userStore?.canvas?.name || '');
    setFieldValue('email', userStore?.canvas?.email || '');
    setFieldValue('currentPassword', '');
    setFieldValue('newPassword', '');
    setFieldValue('confirmPassword', '');
    isChangingPassword.value = false;
  }
  
  editMode.value = !editMode.value;
};

// Toggle password change form
const togglePasswordChange = () => {
  isChangingPassword.value = !isChangingPassword.value;
};


const onSubmit = handleSubmit(async (values: { name: any; email: any; currentPassword: any; newPassword: any; }) => {
  loading.value = true;
  
  // try {
  //   const userData: {
  //     name: any;
  //     email: any;
  //     current_password?: any;
  //     new_password?: any;
  //   } = {
  //     name: values.name,
  //     email: values.email,
  //   };
    
  //   // Add password data if changing password
  //   if (isChangingPassword.value) {
  //     userData.current_password = values.currentPassword;
  //     userData.new_password = values.newPassword;
  //   }
    
  //   await api.put('/users/infos', userData);
    
  //   // Update user in store
  //   await userStore.getUserInfo();
    
  //   notificationsStore.showNotification({
  //     text: 'Profile updated successfully',
  //     color: 'success',
  //   });
    
  //   // Exit edit mode
  //   editMode.value = false;
  //   isChangingPassword.value = false;
  // } catch (error) {
  //   notificationsStore.showNotification({
  //     text: 'Failed to update profile',
  //     color: 'error',
  //   });
  // } finally {
  //   loading.value = false;
  // }
});

// onMounted(() => {
//   // Ensure we have the latest user data
//   if (userStore.isAuthenticated) {
//     userStore.getUserInfo();
//   }
// });
</script>

<template>
  <div class="profile-container">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold mb-4">Meu Perfil</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="8" lg="6" class="mx-auto">
        <v-card>
          <v-card-item>
            <template v-slot:prepend>
              <v-avatar color="primary" size="large">
                <span class="text-h5 text-white">{{ userStore?.canvas?.name?.charAt(0) || 'U' }}</span>
              </v-avatar>
            </template>
            <v-card-title>
              {{ userStore?.canvas?.name || 'User' }}
            </v-card-title>
            <v-card-subtitle>{{ userStore?.canvas?.email || 'user@example.com' }}</v-card-subtitle>
          </v-card-item>

          <v-divider></v-divider>
          <v-card-text v-if="!editMode">
            <v-list>
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-account</v-icon>
                </template>
                <v-list-item-title>Name</v-list-item-title>
                <v-list-item-subtitle>{{ userStore?.canvas?.name }}</v-list-item-subtitle>
              </v-list-item>
              
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-email</v-icon>
                </template>
                <v-list-item-title>Email</v-list-item-title>
                <v-list-item-subtitle>{{ userStore?.canvas?.email }}</v-list-item-subtitle>
              </v-list-item>
              
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-shield-lock</v-icon>
                </template>
                <v-list-item-title>Password</v-list-item-title>
                <v-list-item-subtitle>********</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
          
          <!-- Edit mode -->
          <v-card-text v-else>
            <v-form @submit.prevent="onSubmit">
              <v-text-field
                v-model="values.name"
                label="Name"
                variant="outlined"
                prepend-inner-icon="mdi-account"
                :error-messages="errors.name"
              ></v-text-field>
              
              <v-text-field
                v-model="values.email"
                label="Email"
                variant="outlined"
                prepend-inner-icon="mdi-email"
                type="email"
                :error-messages="errors.email"
              ></v-text-field>
              
              <v-divider class="my-4"></v-divider>
              
              <div class="d-flex align-center mb-4">
                <v-checkbox
                  v-model="isChangingPassword"
                  hide-details
                  label="Change Password"
                ></v-checkbox>
              </div>
              
              <div v-if="isChangingPassword">
                <v-text-field
                  v-model="values.currentPassword"
                  :type="showCurrentPassword ? 'text' : 'password'"
                  label="Current Password"
                  variant="outlined"
                  prepend-inner-icon="mdi-lock"
                  :append-inner-icon="showCurrentPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="showCurrentPassword = !showCurrentPassword"
                  :error-messages="errors.currentPassword"
                ></v-text-field>
                
                <v-text-field
                  v-model="values.newPassword"
                  :type="showNewPassword ? 'text' : 'password'"
                  label="New Password"
                  variant="outlined"
                  prepend-inner-icon="mdi-lock-reset"
                  :append-inner-icon="showNewPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="showNewPassword = !showNewPassword"
                  :error-messages="errors.newPassword"
                ></v-text-field>
                
                <v-text-field
                  v-model="values.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  label="Confirm Password"
                  variant="outlined"
                  prepend-inner-icon="mdi-lock-check"
                  :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="showConfirmPassword = !showConfirmPassword"
                  :error-messages="errors.confirmPassword"
                ></v-text-field>
              </div>
            </v-form>
          </v-card-text>
          
          <v-card-actions>
            <v-spacer></v-spacer>
            
            <template v-if="!editMode">
              <v-btn
                color="primary"
                variant="outlined"
                prepend-icon="mdi-pencil"
                @click="toggleEditMode"
              >
                Editar Perfil
              </v-btn>
            </template>
            
            <template v-else>
              <v-btn
                variant="text"
                @click="toggleEditMode"
                class="mr-2"
              >
                Cancel
              </v-btn>
              
              <v-btn
                color="primary"
                @click="onSubmit"
                :loading="loading"
              >
                Salvar Alterações
              </v-btn>
            </template>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.profile-container {
  padding: 24px;
  max-width: 1440px;
  margin: 0 auto;
}

@media (max-width: 960px) {
  .profile-container {
    padding: 16px;
  }
}
</style>