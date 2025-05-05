<template>
  <div class="crypto-list">
    <h1>📈 Top 100 Cryptocurrencies</h1>

    <input 
      type="text"
      v-model="search"
      placeholder="Search by name or symbol..."
      class="search"
    >

    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Coin</th>
          <th>Price</th>
          <th>24h %</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(coin, index) in filteredCoins"
          :key="coin.id"
          @click="goToCoin(coin.id)"
        >
          <td>{{ index + 1 }}</td>
          <td class="coin-name">
            <img :src="coin.image" alt="">
            {{ coin.name }} ({{ coin.symbol.toUpperCase() }})
          </td>
          <td>$ {{ coin.current_price.toLocaleString() }}</td>
          <td :class="{red: coin.price_change_percentage_24h < 0, green: coin.price_change_percentage_24h >= 0}">
            {{ coin.price_change_percentage_24h.toFixed(2) }}%
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const coins = ref([]);
const search = ref('');
const router = useRouter();

const fetchCoins = async () => {
  let url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
  const res = await fetch(url);
  coins.value = await res.json();
}

onMounted(fetchCoins);

const filteredCoins = computed(() => 
  coins.value.filter((coin) =>
    coin.name.toLowerCase().includes(search.value.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.value.toLowerCase())
  )
);

const goToCoin = (id) => {
  router.push(`/coin/${id}`);
}
</script>

<style scoped>
.crypto-list {
  padding: 2rem;
  max-width: 900px;
  margin: auto;
}

.search {
  width: 100%;
  padding: 12px;
  margin: 20px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
thead {
  background: #42b983;
  color: white;
}

td, th {
  padding: 10px;
  text-align: left;
}

tbody tr {
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #f0f0f0;
  }
}

.coin-name {
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    width: 24px;
    height: 24px;
  }
}

.red {
  color: #e74c3c;
}

.green {
  color: #2ecc71;
}
</style>

