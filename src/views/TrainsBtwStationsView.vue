<script setup lang="ts">
import TrainCard from '@/components/TrainCard.vue'
import { routes } from '@/router'
import { useTrainsBtwStationsStore } from '@/stores/trainsBtwStationsStore'
import { useToastStore } from '@/stores/toastStore'
const toastStore = useToastStore()
let trainsBetweenStationStore = useTrainsBtwStationsStore()

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

  if (trainsBtwStations.value.ok) return

  if (trainsBtwStations.value.httpStatusCode === 404)
    toastStore.addToast({ text: 'No trains found', type: 'Error', persistent: true })
  else
    toastStore.addToast({
      text: JSON.stringify(trainsBtwStations.value.errors[0]),
      type: 'Error',
      persistent: true,
    })
})
</script>
<template>
  <main>
    <TrainCard v-for="train in trainsBtwStations?.data" :key="train.trainNumber" :train="train" />
  </main>
</template>
