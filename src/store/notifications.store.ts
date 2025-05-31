import { defineStore } from 'pinia';
import { ref } from 'vue';

import { NotificationOptions } from '@/shared/interfaces/INotifications';

export const useNotificationsStore = defineStore('notifications', () => {
  const snackbar = ref({
    show: false,
    text: '',
    color: 'info',
    timeout: 5000,
  });

  // Show notification
  const showNotification = (options: NotificationOptions) => {
    snackbar.value = {
      show: true,
      text: options.text,
      color: options.color || 'info',
      timeout: options.timeout || 5000,
    };
  };

  return {
    snackbar,
    showNotification,
  };
});