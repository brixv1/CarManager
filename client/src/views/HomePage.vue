<script setup></script>
<template>
  <div class="homepage_container">
    <h1>
      Welcome, <br />
      <h2>Manage your Cars & Employees</h2>
    </h1>
  </div>
</template>

<style scoped>
h1 {
  animation: fadeIn 4s;
}
h2 {
  animation: fadeIn 4s;
  margin-top: 1rem;
}

.homepage_container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-inline: 0.75rem;
  height: 80vh;
}
@media (min-width: 640px) {
  .homepage_container {
    margin-inline: 1rem;
  }
}

@media (min-width: 1024px) {
  .homepage_container {
    margin-inline: 2rem;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
