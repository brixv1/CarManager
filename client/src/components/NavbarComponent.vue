<script setup>
import { Bars4Icon } from '@heroicons/vue/24/solid'

import { ref, onMounted, onUnmounted } from 'vue'

const onMobile = ref(false)
const showMobileNav = ref(false)

//code down below just sets onMobile true if screensize is less than 640px
const updateScreenWidth = () => {
  onMobile.value = window.innerWidth < 640
}

onMounted(() => {
  updateScreenWidth()
  window.addEventListener('resize', updateScreenWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenWidth)
})

const toggleMobileNav = () => {
  showMobileNav.value = !showMobileNav.value
}
</script>

<template>
  <nav>
    <!-- if onMobile is true, show Hamburger Menu -->
    <div v-if="onMobile">
      <Bars4Icon @click="toggleMobileNav" class="icon" />
    </div>
    <!-- nav -->
    <div v-else>
      <a class="link" href="/cars">Cars</a>
      <a class="link" href="/employees">Employees</a>
    </div>
    <!-- mobile nav -->
    <div v-if="showMobileNav" class="mobile_nav">
      <a class="mobile_link" href="/cars">Cars</a>
      <a class="mobile_link" href="/employees">Employees</a>
    </div>
  </nav>
</template>

<style scoped>
.link {
  background-color: #27272a;
  padding: 0.75rem;
  margin-left: 3rem;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1.25rem;
}
.link:hover {
  background-color: #4f4f52;
  transition: 0.3s;
  cursor: pointer;
}

.icon {
  width: 3.5rem;
  height: 3.5rem;
  background: #27272a;
  border-radius: 5px;
  margin-top: 7px;
  padding: 5px;
}

.mobile_link {
  background-color: #27272a;
  padding: 1.5rem;
  margin: 0.5rem;
  border-radius: 5px;
  font-weight: bold;
  font-size: 2.25rem;
  text-align: center;
}
.mobile_nav {
  background-color: #27272a;
  width: 100vw;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 47%;
  left: 50%;
  transform: translate(-50%, -110%);
  z-index: 10;
}

@media (min-width: 640px) {
  .link {
    padding: 0.9rem;
    font-size: 1.15rem;
  }
}
@media (min-width: 1024px) {
  .link {
    padding-inline: 1rem;
    font-size: 1.65rem;
  }
}
</style>
