<script setup>
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
</script>

<template>
  <div class="wrapper">
    <HeaderComponent />
    <RouterView />
  </div>
  <FooterComponent />
</template>


<!-- Global Styles -->
<style>
*,
html,
body {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
  color: #f4f4f5;
}

html {
  background: #171717;
}

.wrapper {
  margin-inline: auto;
}

a {
  all: unset;
}

::selection {
  background: #e6c74c;
}
@media (min-width: 640px) {
  .wrapper {
    max-width: 80vw;
  }
}
</style>
