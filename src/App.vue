<script setup>
import { RouterView, RouterLink } from 'vue-router';
</script>

<template>
  <div style="margin: 3px;">
    <header>
      <img src="./assets/logo.jpg" alt="Business Logo" class="logo" />
    </header>
    <br>
    <nav>
      <RouterLink to="/">LandingPage</RouterLink>
      <RouterLink to="/create-invoice">Create Invoice</RouterLink>
      <RouterLink to="/edit-invoice/:id">Edit</RouterLink>
      <RouterLink to="/history">History</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style>
.container {
  display: flex;
  align-items: center;
  padding: 5px;
}

.logo {
  margin-right: 20px; /* Adjust the margin as needed */
}

nav {
  width: 100%;
  background-color: #333; /* Change the background color as needed */
  color: white; /* Change the text color as needed */
  padding: 10px;
  display: flex;
  justify-content: space-around;
}

nav a {
  text-decoration: none;
  color: white; /* Change the text color as needed */
}
</style>
