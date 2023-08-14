<script setup lang="ts">
import Autocomplete from '@/components/AutocompleteComponent.vue'
import DatepickerComponent from '@/components/DatepickerComponent.vue'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useTrainsBtwStationsStore } from '@/stores/trainsBtwStationsStore'
import client from '@/util/ApiClient'
import type { StationGeneralInfo } from 'api-railway'
import { routes } from '@/router'
import { useToastStore } from '@/stores/toastStore'

const toastStore = useToastStore()
const router = useRouter()
const trainsBetweenStationStore = useTrainsBtwStationsStore()
const fromStationInputText = ref('')
const toStationInputText = ref('')

onMounted(() => {})

async function getStationList(q: string) {
  const LIMIT = 20
  return await client.stations.getStationsGeneral(q, LIMIT)
}

async function updateStationList(q: string) {
  if (q === '') return
  const stations = await getStationList(q)
  if (!stations.ok) return
  trainsBetweenStationStore.stationList = stations.data.flatMap(value => {
    return { ...value, text: `${value.stationName} - ${value.stationCode}` }
  })
}

function onAutocompleteItemClick(data: StationGeneralInfo, context: 'FromStation' | 'ToStation') {
  if (!data) {
    trainsBetweenStationStore.fromStationCode = ''
    trainsBetweenStationStore.fromStationName = ''
    trainsBetweenStationStore.toStationCode = ''
    trainsBetweenStationStore.toStationName = ''
    return
  }
  if (context === 'FromStation') {
    trainsBetweenStationStore.fromStationCode = data.stationCode
    trainsBetweenStationStore.fromStationName = data.stationName
  } else if (context === 'ToStation') {
    trainsBetweenStationStore.toStationCode = data.stationCode
    trainsBetweenStationStore.toStationName = data.stationName
  }
}

function searchTrain() {
  if (!formValidation()) return

  trainsBetweenStationStore.redirected = true
  router.push(routes.trainsBtwStations)
}

function formValidation() {
  let flag = false
  if (fromStationInputText.value === '') {
    toastStore.addToast({ text: 'From station empty', type: 'Error' })
    flag = true
  }

  if (toStationInputText.value === '') {
    toastStore.addToast({ text: 'To station empty', type: 'Error' })
    flag = true
  }

  if (flag === true) {
    return false
  }

  if (
    trainsBetweenStationStore.fromStationName === '' ||
    trainsBetweenStationStore.fromStationCode === '' ||
    `${trainsBetweenStationStore.fromStationName} - ${trainsBetweenStationStore.fromStationCode}` !==
      fromStationInputText.value
  ) {
    toastStore.addToast({ text: 'Invalid from station', type: 'Error' })
    flag = true

    return false
  }

  if (
    trainsBetweenStationStore.toStationName === '' ||
    trainsBetweenStationStore.toStationCode === '' ||
    `${trainsBetweenStationStore.toStationName} - ${trainsBetweenStationStore.toStationCode}` !==
      toStationInputText.value
  ) {
    toastStore.addToast({ text: 'Invalid to station', type: 'Error' })
    flag = true
  }

  if (flag === true) {
    return false
  }

  if (trainsBetweenStationStore.fromStationName === trainsBetweenStationStore.toStationName) {
    toastStore.addToast({ text: 'From station cannot be same as to station', type: 'Error' })
    return false
  }
  return true
}

function swap() {
  trainsBetweenStationStore.swap()
  const temp = fromStationInputText.value
  fromStationInputText.value = toStationInputText.value
  toStationInputText.value = temp
}
</script>
<template>
  <Autocomplete
    id="from-station"
    class="station-input-container"
    name="fromStation"
    label="From station"
    v-model:text="fromStationInputText"
    @onKeyUp="updateStationList"
    :autocompleteList="trainsBetweenStationStore.stationList"
    @onAutocompleteItemClick="data => onAutocompleteItemClick(data, 'FromStation')">
    <img alt="" class="logo" src="@/assets/waiting.png" />
  </Autocomplete>
  <div class="line">
    <span class="swap-container" @click="swap">
      <img alt="swap" class="swap" src="@/assets/swap.svg" />
    </span>
  </div>
  <Autocomplete
    id="to-station"
    class="station-input-container"
    name="toStation"
    label="To station"
    v-model:text="toStationInputText"
    @onKeyUp="updateStationList"
    :autocompleteList="trainsBetweenStationStore.stationList"
    @onAutocompleteItemClick="data => onAutocompleteItemClick(data, 'ToStation')">
    <img alt="" class="logo" src="@/assets/arrived.png" />
  </Autocomplete>
  <div class="line"></div>
  <DatepickerComponent class="date-input-container" v-model:date="trainsBetweenStationStore.date" />
  <div class="line"></div>

  <button class="search-button" type="button" @click="searchTrain">Search Trains</button>
</template>

<style scoped>
.line {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  position: relative;
}
.station-input-container {
  width: 100%;
  height: 3em;
  font-size: 1.2rem;
}

.station-input-container:nth-child(3) {
  margin-top: 1em;
}

.swap-container {
  position: absolute;
  cursor: pointer;
  width: 2.5em;
  height: 2.5em;
  right: 3em;
  top: -1.2em;
  border-radius: 100%;
  border: solid 1px black;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
.swap {
  transform: rotate(90deg);
  padding: 3px;
  height: 1.7em;
}

.date-input-container {
  width: 100%;
  height: 4em;
  font-size: larger;
}

.logo {
  width: 1.5em;
  margin: 0 5px;
}

.search-button {
  font-family: 'Roboto Mono', monospace;
  color: white;
  background-color: rgb(241, 90, 34);
  border: none;
  border-radius: 1em;
  height: 3em;
  margin: 1em auto;
  width: 80%;
  font-size: larger;
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
