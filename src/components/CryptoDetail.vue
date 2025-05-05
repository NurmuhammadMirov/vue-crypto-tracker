<template>
  <div class="crypto-detail" v-if="coin">
    <div class="coin-header">
      <img :src="coin.image.large" :alt="coin.name" />
      <h1>{{ coin.name }} <span>({{ coin.symbol.toUpperCase() }})</span></h1>
    </div>

    <div class="coin-card">
      <div class="stat"><label>Current Price: </label>${{ coin.market_data.current_price.usd.toLocaleString() }}</div>
      <div class="stat"><label>Market Cap: </label>${{ coin.market_data.market_cap.usd.toLocaleString() }}</div>
      <div class="stat"><label>Total Volume: </label>${{ coin.market_data.total_volume.usd.toLocaleString() }}</div>
      <div class="stat"><label>24h High: </label>${{ coin.market_data.high_24h.usd.toLocaleString() }}</div>
      <div class="stat"><label>24h Low: </label>${{ coin.market_data.low_24h.usd.toLocaleString() }}</div>
    </div>

    <div class="coin-desc">
      <h2>📘 Description</h2>
      <div v-html="coin.description.en"></div>
    </div>
  </div>

  <p v-else class="loading">Loading coin data...</p>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const coin = ref(null);

const fetchCoin = async () => {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${route.params.id}`);
    coin.value = await res.json();
  } catch (error) {
    console.error('Error fetching coin:', error);
  }
}

onMounted(fetchCoin);
</script>

<style scoped>
.crypto-detail {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
  color: #2c3e50;
}
.coin-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 2rem;

  img {
    width: 64px;
    height: 64px;
  }

  h1 {
    font-size: 2rem;
    margin: 0;
  }

  span {
    font-size: 1.2rem;
    color: #888;
  }
}

.coin-card {
  background: #f8f8f8;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 14px rgba(0,0,0,0.1);
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 12px;
  margin-bottom: 2rem;
}

.stat {
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 500;

  label {
    color: #555;
  }
}

.coin-desc {
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.08);

  h2 {
    margin-bottom: 1rem;
    font-size: 1.3rem;
    color: #333;
  }

  div {
    color: #444;
    line-height: 1.6;
  }

  .loading {
    max-width: 800px;
    text-align: center;
    font-size: 1.2rem;
    color: #666;
  }
}
</style>