import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { VueQueryPlugin } from "@tanstack/vue-query";
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";

const app = createApp(App);
app.use(router);
app.use(VueQueryPlugin);
app.component('VueQueryDevtools', VueQueryDevtools);
app.mount('#app');
