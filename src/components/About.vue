<template>
  <div class="crypto-detail" v-if="coin">
    <h1>{{ coin.name }} ({{ coin.symbol.toUpperCase() }})</h1>
    <img :src="coin.image.large" :alt="coin.name" class="coin-image" />

    <div class="details">
      <p><strong>Current Price:</strong>$ {{ coin.market_data.current_price.usd.toLocaleString() }}</p>
      <p><strong>Market Cap:</strong>$ {{ coin.market_data.market_cap.usd.toLocaleString() }}</p>
      <p><strong>Total Volume:</strong>$ {{ coin.market_data.total_volume.usd.toLocaleString() }}</p>
      <p><strong>24h High:</strong>$ {{ coin.market_data.high_24h.usd.toLocaleString() }}</p>
      <p><strong>24h Low:</strong>$ {{ coin.market_data.low_24h.usd.toLocaleString() }}</p>
    </div>

    <div class="description" v-html="coin.description.en"></div>
  </div>

  <p v-else class="loading">Loading...</p>
</template>

<script>
</script>