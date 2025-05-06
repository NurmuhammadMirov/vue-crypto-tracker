<template>
  <div class="about">
    <h1>🧠 About This App</h1>

    <p>
      This app tracks cryptocurrencies using real-time market data from the
      <a href="https://www.coingecko.com/en/api" target="_blank" rel="noopener noreferrer">CoinGecko API</a>.
    </p>

    <p>
      Built with <strong>Vue 3</strong>, <strong>Vue Router</strong>, <strong>Tanstack Vue-Query</strong>, and <strong>Vite</strong>.
    </p>

    <p>
      Designed for learning purposes by <a href="https://github.com/NurmuhammadMirov" target="_blank">Mirov</a>.
    </p>
  </div>
</template>

<style scoped>
.about {
  max-width: 600px;
  margin: auto;
  padding: 2rem;
  line-height: 1.6;
}
a {
  color: #42b983;
  text-decoration: none;
}
a:hover {
  text-decoration: underline
}
</style>