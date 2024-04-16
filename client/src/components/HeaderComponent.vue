<script setup>
import LogoComponent from './LogoComponent.vue'
import NavbarComponent from './NavbarComponent.vue'
</script>
<template>
  <header class="header_container">
    <LogoComponent />
    <NavbarComponent />
  </header>
</template>

<style scoped>
.header_container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.75rem;
}
@media (min-width: 640px) {
  .header_container {
    margin: 1rem;
  }
}

@media (min-width: 1024px) {
  .header_container {
    margin: 2rem;
  }
}
</style>
