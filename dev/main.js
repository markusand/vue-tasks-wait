import { createApp } from 'vue';
import Wait from '../src';
import App from './App.vue';

const app = createApp(App);
app.use(Wait);
app.mount('#app');
