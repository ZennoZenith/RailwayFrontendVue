<script setup lang="ts">
// import { beforeRoute } from 'vue-router'
import { useTrainsBtwStationsStore } from '@/stores/trainsBtwStationsStore'
let trainsBetweenStationStore = useTrainsBtwStationsStore()
import { routes } from '@/router'

import router from '@/router'
import { onMounted } from 'vue'

onMounted(() => {
  if (trainsBetweenStationStore.redirected !== true) {
    router.push(routes.home)
    return
  }
  trainsBetweenStationStore.redirected = false
  
})
</script>
<template>
  <main>Trains between stations</main>
</template>
