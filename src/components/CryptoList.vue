<template>
  <div class="crypto-list">
    <h1>📈 Top Cryptocurrencies</h1>

    <input 
      type="text"
      v-model="search"
      placeholder="Search by name or symbol..."
      class="search"
    >

    <div v-if="isLoading" class="loader">Loading coins...</div>
    <p v-else-if="isError" class="error">
      Error: {{ error.message || 'Too many requests. Try again shortly.' }}
    </p>
    <div v-else>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Coin</th>
              <th>Price</th>
              <th>24h %</th>
            </tr>
          </thead>
        </table>
      
        <div class="scrollable-body">
          <table>
            <tbody>
              <tr
                v-for="(coin, index) in filteredCoins"
                :key="coin.id"
                @click="goToCoin(coin.id)"
              >
                <td>{{  isSearching ? index + 1 : (page - 1) * perPage + index + 1 }}</td>
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
      </div>
      <div v-if="isFetching" class="fetching-indicator">
        Fetching new data...
      </div>
    </div>

    <div class="pagination" v-if="!isSearching">
      <button @click="page--" :disabled="page === 1 || isLoading">⬅ Prev</button>
      <span>Page {{ page }}</span>
      <button @click="page++" :disabled="isLoading">Next ➡</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';

const router = useRouter();
const search = ref('');
const page = ref(1);
const perPage = 25;

const fetchPaginated = async ({ queryKey }) => {
  const [_key, page] = queryKey;
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}`);
  return await res.json();
}

const fetchAll = async () => {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1`);
  return await res.json();
};

const pagedQuery = useQuery({
  queryKey: ['coins', page],
  queryFn: fetchPaginated,
  keepPreviousData: true,
  staleTime: 1000 * 60 * 5,
  retry: 2,
  retryDelay: attempt => attempt * 1000
});

const isSearching = computed(() => search.value.trim().length > 0);

const searchQuery = useQuery({
  queryKey: ['allCoins'],
  queryFn: fetchAll,
  enabled: isSearching, // only fetch when searching
  staleTime: 1000 * 60 * 5,
  retry: 2,
  retryDelay: attempt => attempt * 1000
});

const {
  data: pageData,
  isLoading,
  isFetching,
  isError,
  error
} = pagedQuery

const filteredCoins = computed(() => {
  const list = isSearching.value 
    ? searchQuery.data?.value || [] 
    : pageData?.value || []
  return list.filter(coin =>
    coin.name.toLowerCase().includes(search.value.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.value.toLowerCase())
  );
});

const goToCoin = (id) => {
  router.push(`/coin/${id}`);
}
</script>

<style scoped>
.table-container {
  max-height: calc(100vh - 344px);
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.table-wrapper {
  overflow: hidden;
}

.scrollable-body {
  max-height: calc(100vh - 354px);
  overflow-y: auto;
}

.crypto-list {
  padding-inline: 2rem;
  padding-bottom: 2rem;
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

.loader {
  text-align: center;
  font-size: 1.2rem;
  color: #555;
  margin: 2rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #42b983;
  color: white;
  position: sticky;
  top: 0;
  z-index: 1;
}

td, th {
  padding: 10px;
  text-align: left;
}

td:first-child {
  text-align: right;
  width: 60px;
}

tbody tr {
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #f0f0f0;
  }
}

.fetching-indicator {
  text-align: center;
  color: #888;
  font-size: 0.9rem;
  margin-top: 0.5rem;
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

.pagination {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;

  button {
    padding: 0.5rem 1rem;
    font-weight: bold;
    background: #42b983;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }
}
</style>

