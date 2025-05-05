import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue';
import Coin from '../views/Coin.vue';
import About from '../components/About.vue';

const routes = [
  {path: '/', name: 'Home', component: Home},
  {path: '/coin/:id', name: 'CoinDetails', component: Coin},
  {path: '/about', name: 'About', component: About},
  {path: '/:pathMatch(.*)*', redirect: '/'}, // 404 fallback
];

export default createRouter({
  history: createWebHistory(),
  routes,
})