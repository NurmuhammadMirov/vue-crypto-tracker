<template>
  <div class="crypto-detail">
    <p v-if="isLoading">Loading coin data...</p>
    <p v-else-if="isError" style="color: red;">Error: {{ error.message }}</p>
    <div v-else>
      <div class="coin-header">
        <img :src="coin.image.large" :alt="coin.name" />
        <h1>{{ coin.name }} <span>({{ coin.symbol.toUpperCase() }})</span></h1>
        <button @click="refetch" class="refresh-btn">🔄 Refresh</button>
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
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useQuery } from '@tanstack/vue-query'

const route = useRoute();
const coinId = route.params.id;

const fetchCoin = async () => {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
  if (!res.ok) throw new Error("Failed to fetch coin details");
  return await res.json();
}

const { data: coin, isLoading, isError, error, refetch } = useQuery({
  queryKey: ['coin', coinId],
  queryFn: fetchCoin,
  staleTime: 1000 * 60 * 10, // 10 mins
  refetchOnWindowFocus: true,
});
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

  .refresh-btn {
    margin-top: 10px;
    padding: 6px 12px;
    background: #42b983;
    border: none;
    border-radius: 6px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      background: #2e9f6c;
    }
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