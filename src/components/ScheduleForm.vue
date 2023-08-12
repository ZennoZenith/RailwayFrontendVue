<script setup lang="ts">
import Autocomplete from '@/components/AutocompleteComponent.vue'
import { onMounted, ref } from 'vue'

import client from '@/util/ApiClient'
import { useScheduleStore } from '@/stores/scheduleStore'
import type { TrainGeneralInfo } from 'api-railway'

const scheduleStore = useScheduleStore()
const trainNumberInputText = ref('')

const emits = defineEmits(['onScheduleSearch'])
onMounted(() => {
  if (scheduleStore.trainNumber !== undefined && scheduleStore.trainNumber !== '')
    trainNumberInputText.value = `${scheduleStore.trainNumber} - ${scheduleStore.trainName}`
})

async function getTrainList(q: string) {
  const LIMIT = 10
  return await client.trains.getTrainsGeneral(q, LIMIT)
}

async function updateTrainList(q: string) {
  if (q === '') return
  if (q.length > 4) {
    if (scheduleStore.trainList) {
      scheduleStore.trainList = scheduleStore.trainList
        .filter(train => train.trainNumber.includes(q) || train.trainName.includes(q))
        .flatMap(value => {
          return { ...value, text: `${value.trainNumber} - ${value.trainName}` }
        })
      return
    }
  }
  const trains = await getTrainList(q)
  if (!trains.ok) return
  scheduleStore.trainList = trains.data.flatMap(value => {
    return { ...value, text: `${value.trainNumber} - ${value.trainName}` }
  })
}

function onAutocompleteItemClick(data: TrainGeneralInfo) {
  if (!data) {
    scheduleStore.trainNumber = ''
    scheduleStore.trainName = ''
    return
  }
  scheduleStore.trainNumber = data.trainNumber
  scheduleStore.trainName = data.trainName
  searchSchedule()
}

function searchSchedule() {
  emits('onScheduleSearch')
}
</script>
<template>
  <Autocomplete
    id="train-number"
    class="train-input-container"
    name="trainNumber"
    label="Train Number / Name"
    v-model:text="trainNumberInputText"
    @onKeyUp="updateTrainList"
    :autocompleteList="scheduleStore.trainList"
    @onAutocompleteItemClick="onAutocompleteItemClick">
    <img alt="" class="logo" src="@/assets/train-schedule.svg" />
  </Autocomplete>

  <button class="search-button" type="button" @click="searchSchedule">Search Trains</button>
</template>

<style scoped>
.train-input-container {
  width: 17em;
  max-width: 100%;
  height: 3em;
  font-size: 1rem;
  margin: 1em auto;
  padding: 5px;
  border: solid 1px rgba(0, 0, 0, 0.5);
}

.logo {
  width: 1.5em;
  margin: 0 5px;
}

.search-button {
  display: block;
  margin: 0 auto;
  font-family: 'Roboto Mono', monospace;
  color: white;
  background-color: rgb(241, 90, 34);
  border: none;
  border-radius: 1em;
  height: 3em;
  margin: 1em auto;
  width: 10em;
  font-size: smaller;
}

.search-button:hover {
  border: none;
  outline: none;
}

.search-button:focus {
  border: none;
  outline: none;
}
</style>
