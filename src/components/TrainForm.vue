<script setup lang="ts">
import Autocomplete from '@/components/AutocompleteComponent.vue'
import { onMounted, ref } from 'vue'
import client from '@/util/ApiClient'
import { useTrainStore } from '@/stores/trainStore'
import type { TrainGeneralInfo } from 'api-railway'
import { useToastStore } from '@/stores/toastStore'
const toastStore = useToastStore()

const trainStore = useTrainStore()
const trainNumberInputText = ref('')

const emits = defineEmits(['onTrainSearch'])
onMounted(() => {
  if (trainStore.trainNumber !== undefined && trainStore.trainNumber !== '')
    trainNumberInputText.value = `${trainStore.trainNumber} - ${trainStore.trainName}`
})

function formValidation() {
  if (trainNumberInputText.value === '') {
    toastStore.addToast({ text: 'Train number is empty', type: 'Error' })
    return false
  }
  if (trainStore.trainNumber === '') {
    toastStore.addToast({ text: 'Invalid train number', type: 'Error' })
    return false
  }
  return true
}

async function getTrainList(q: string) {
  const LIMIT = 10
  return await client.trains.getTrainsGeneral(q, LIMIT)
}

async function updateTrainList(q: string) {
  if (q === '') return
  if (parseInt(q) && q.length > 4) {
    if (trainStore.trainList) {
      trainStore.trainList = trainStore.trainList
        .filter(train => train.trainNumber.includes(q) || train.trainName.includes(q))
        .flatMap(value => {
          return { ...value, text: `${value.trainNumber} - ${value.trainName}` }
        })
      return
    }
  }
  const trains = await getTrainList(q)
  if (!trains.ok) {
    toastStore.addToast({ text: 'No train found', type: 'Error' })
    return
  }
  trainStore.trainList = trains.data.flatMap(value => {
    return { ...value, text: `${value.trainNumber} - ${value.trainName}` }
  })
}

function onAutocompleteItemClick(data: TrainGeneralInfo) {
  if (!data) {
    trainStore.trainNumber = ''
    trainStore.trainName = ''
    return
  }
  trainStore.trainNumber = data.trainNumber
  trainStore.trainName = data.trainName
  searchSchedule()
}

function searchSchedule() {
  if (!formValidation()) return
  emits('onTrainSearch')
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
    :autocompleteList="trainStore.trainList"
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
@/stores/trainStore
