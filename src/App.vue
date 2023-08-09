<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HamburgerComponent from '@/components/HamburgerComponent.vue'
import NavComponent from './components/NavComponent.vue'
</script>

<template>
  <header>
    <div class="website-title">
      <RouterLink to="/" class="link">
        <img alt="RailwayDemo logo" class="logo" src="@/assets/logo.svg" />
        <h1>Railway Demo</h1>
      </RouterLink>
    </div>
    <HamburgerComponent />
    <NavComponent />
  </header>
  <RouterView />
</template>

<style scoped>
header {
  z-index: 10;
  background-color: var(--white);
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  padding: 10px;
  /* background-color: blueviolet; */
  height: var(--header-height);
  /* border-bottom: 1px rgba(40, 40, 40, 0.5) solid; */
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
}
.website-title {
  /* flex-grow: 1; */
  margin-right: auto;
}

.link {
  text-decoration: none;
  color: inherit;
  height: calc(var(--header-height) - 10px);
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.logo {
  text-decoration: none;
  flex-shrink: 1;
}
</style>
