<script setup lang="ts">
import HamburgerComponent from '@/components/HamburgerComponent.vue'
import NavComponent from './components/NavComponent.vue'
</script>

<template>
  <header>
    <div class="logo"></div>
    <HamburgerComponent />
    <NavComponent />
  </header>

  <RouterView />
</template>

<style scoped>
header {
  --header-height: 4rem;
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  padding: 10px;
  /* background-color: blueviolet; */
  height: var(--header-height);
  border-bottom: 1px rgba(40, 40, 40, 0.5) solid;
}

.logo {
  flex-grow: 1;
}
</style>
