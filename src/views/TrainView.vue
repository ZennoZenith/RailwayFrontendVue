<script setup lang="ts">
import TrainForm from '@/components/TrainForm.vue'
import { useTrainStore } from '@/stores/trainStore'
import client from '@/util/ApiClient'
import { type TrainInfo } from 'api-railway'
import { onMounted, ref, computed } from 'vue'

const trainStore = useTrainStore()

const trainInfo = ref<TrainInfo>()
const trainNumberName = ref<{ trainNumber: string; trainName: string }>({
  trainName: '',
  trainNumber: '',
})

const trainRunsOnDays = [
  ['sunday', 'S', 'Sun'],
  ['monday', 'M', 'Mon'],
  ['tueday', 'T', 'Tue'],
  ['wednesday', 'W', 'Wed'],
  ['thursday', 'T', 'Thu'],
  ['friday', 'F', 'Fri'],
  ['saturday', 'S', 'Sat'],
] as const

function beautifyTrainRunsOn(trainRunsOn?: TrainInfo['trainRunsOn']) {
  if (!trainRunsOn) return ''
  const tempArr = []
  if (trainRunsOn.sunday) tempArr.push('Sun')
  if (trainRunsOn.monday) tempArr.push('Mon')
  if (trainRunsOn.tueday) tempArr.push('Tue')
  if (trainRunsOn.wednesday) tempArr.push('Wed')
  if (trainRunsOn.thursday) tempArr.push('Thu')
  if (trainRunsOn.friday) tempArr.push('Fri')
  if (trainRunsOn.saturday) tempArr.push('Sat')

  if (tempArr.length === 7) return 'Daily'

  return tempArr.join(', ')
}

function beautifyDuration(duration?: string) {
  if (!duration) return ''
  let temp = duration.split(':')
  return `${temp[0]}h ${temp[1]}m`
}

async function searchTrainInfo() {
  const res = await client.trains.getTrains(trainStore.trainNumber)
  if (!res.ok) return
  trainInfo.value = res.data[0]
  trainNumberName.value.trainName = res.data[0].trainName
  trainNumberName.value.trainNumber = res.data[0].trainNumber
}

const trainObjToArr = computed(function () {
  const arr = []
  arr.push(
    ['Train number', trainInfo.value?.trainNumber],
    ['Train name', trainInfo.value?.trainName],
    ['Train full name', trainInfo.value?.trainFullName],
    ['Train running days', beautifyTrainRunsOn(trainInfo.value?.trainRunsOn)],
    ['Available classes', trainInfo.value?.availableClasses?.join(', ')],
    ['Pantry', trainInfo.value?.hasPantry ? 'Yes' : 'No'],
    ['Train type code', trainInfo.value?.trainTypeCode],
    ['Train return number', trainInfo.value?.returnTrainNumber],
    ['Station from code', trainInfo.value?.stationFrom.stationCode],
    ['Station from name', trainInfo.value?.stationFrom.stationName],
    ['Station to code', trainInfo.value?.stationTo.stationCode],
    ['Station to name', trainInfo.value?.stationTo.stationName],
    ['Departure time', trainInfo.value?.departureTime],
    ['Arrival time', trainInfo.value?.arrivalTime],
    ['Duration', beautifyDuration(trainInfo.value?.duration)],
    ['Distance', `${trainInfo.value?.distance} km`],
    ['Avg. Speed', `${trainInfo.value?.avgSpeed} km/h`],
    ['Number of stops', trainInfo.value?.numberOfStops],
  )
  return arr
})

onMounted(() => {
  if (trainStore.redirected === true) searchTrainInfo()
  trainStore.redirected = false
})
</script>

<template>
  <main>
    <section class="search-schedule-form-container">
      <TrainForm @on-train-search="searchTrainInfo" />
    </section>
    <section class="train-info" v-if="trainInfo">
      <div v-for="(item, index) in trainObjToArr" :key="index" class="grid-2">
        <span class="label">{{ item[0] }}</span>
        <span class="value">{{ item[1] }}</span>
      </div>
    </section>
  </main>
</template>

<style scoped>
.grid-2 {
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
  border: 1px rgba(0, 0, 0, 0.5) solid;
  border-bottom: none;
  gap: 5px;
}
.grid-2:last-child {
  border-bottom: 1px rgba(0, 0, 0, 0.5) solid;
}

.grid-2 > * {
  min-width: 0;
}
.label {
  padding: 5px;
  font-weight: bold;
  border-right: 1px rgba(0, 0, 0, 0.5) solid;
}
</style>
