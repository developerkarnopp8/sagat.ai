import { createApp } from 'vue';
import { vuetify } from './plugins/vuetify';
import { createPinia } from 'pinia'
import './style.css';
import App from './App.vue';
import router from './router';

createApp(App).use(router).use(vuetify).use(createPinia()).mount('#app')
