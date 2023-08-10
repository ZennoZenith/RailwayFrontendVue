<script setup lang="ts">
// import { beforeRoute } from 'vue-router'
import { useTrainsBtwStationsStore } from '@/stores/trainsBtwStationsStore'
let trainsBetweenStationStore = useTrainsBtwStationsStore()
import { routes } from '@/router'
import Client, { type ApiRetrunType, type TrainsBtwStationsType } from 'api-railway'
import router from '@/router'
import { onMounted, ref } from 'vue'

import client from '@/util/ApiClient'

let trainsBtwStations = ref<ApiRetrunType<TrainsBtwStationsType>>()

onMounted(async () => {
  if (trainsBetweenStationStore.redirected !== true) {
    router.push(routes.home)
    return
  }
  trainsBetweenStationStore.redirected = false

  trainsBtwStations.value = await client.trainsBtwStations.getTrainsBtweenStations(
    trainsBetweenStationStore.fromStationName,
    trainsBetweenStationStore.toStationName,
  )

  const test = await client.trainsBtwStations.getTrainsBtweenStations(
    trainsBetweenStationStore.fromStationName,
    trainsBetweenStationStore.toStationName,
  )
})
</script>
<template>
  <main>
    <!-- Trains between stations -->
    {{ trainsBtwStations?.data[0]. }}
  </main>
</template>
