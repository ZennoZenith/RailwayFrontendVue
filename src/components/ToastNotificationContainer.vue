<script setup lang="ts">
import ToastNotification from './ToastNotification.vue'
import { useToastStore } from '@/stores/toastStore'
const toastStore = useToastStore()
</script>

<template>
  <div class="toast-container" v-show="toastStore.hasToast">
    <ToastNotification v-for="item in toastStore.toasts" :key="item.id" :toast="item">
      {{ item.text }}
    </ToastNotification>
  </div>
</template>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 2em;
  right: 2em;
  max-width: 20rem;
  max-height: 30rem;
  overflow: hidden;
  text-overflow: clip;
  overflow-y: scroll;
  display: flex;
  flex-direction: column-reverse;
  gap: 10px;
}
</style>
