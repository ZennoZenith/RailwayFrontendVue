<script setup lang="ts">
import TrainCard from '@/components/TrainCard.vue'
import { useTrainsBtwStationsStore } from '@/stores/trainsBtwStationsStore'
let trainsBetweenStationStore = useTrainsBtwStationsStore()
import { routes } from '@/router'

import {
  type ApiRetrunType,
  type TrainsBtwStationsType,
  type TrainsBtwStationsExtraType,
  type ErrorObj,
} from 'api-railway'
import client from '@/util/ApiClient'

import router from '@/router'
import { onMounted, ref } from 'vue'

let trainsBtwStations =
  ref<ApiRetrunType<TrainsBtwStationsType, ErrorObj, TrainsBtwStationsExtraType>>()

onMounted(async () => {
  if (trainsBetweenStationStore.redirected !== true) {
    router.push(routes.home)
    return
  }

  trainsBetweenStationStore.redirected = false
  trainsBtwStations.value = await client.trainsBtwStations.getTrainsBtweenStations(
    trainsBetweenStationStore.fromStationCode,
    trainsBetweenStationStore.toStationCode,
  )
})
</script>
<template>
  <main>
    <TrainCard v-for="train in trainsBtwStations?.data" :key="train.trainNumber" :train="train" />
  </main>
</template>
