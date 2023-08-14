<script setup lang="ts">
import Autocomplete from '@/components/AutocompleteComponent.vue'
import client from '@/util/ApiClient'
import { type StationGeneralInfo, type StationInfo } from 'api-railway'
import { ref, computed } from 'vue'
import { useToastStore } from '@/stores/toastStore'
const toastStore = useToastStore()

const stationInfo = ref<StationInfo>()
const stationInputText = ref('')
const stationList = ref<string[]>([])
let stationCode = ''

const stationObjToArr = computed(function () {
  const arr = []
  arr.push(
    ['Station code', stationInfo.value?.stationCode],
    ['Station name', stationInfo.value?.stationName],
    ['State', stationInfo.value?.stateName],
    ['Station type', stationInfo.value?.stationType],
    ['No. of platforms', stationInfo.value?.numberOfPlatforms],
    ['Hindi station name', stationInfo.value?.hindiStationName],
    ['Zone', `${stationInfo.value?.zones.zoneCode} - ${stationInfo.value?.zones.zoneName}`],
    ['Latitude', stationInfo.value?.latitude],
    ['Longitude', stationInfo.value?.longitude],
  )
  return arr
})

function formValidation() {
  if (stationInputText.value === '') {
    toastStore.addToast({ text: 'Train number is empty', type: 'Error' })
    return false
  }
  if (stationCode === '') {
    toastStore.addToast({ text: 'Station code empty', type: 'Error' })
    return false
  }
  return true
}

async function getStationList(q: string) {
  const LIMIT = 20
  return await client.stations.getStationsGeneral(q, LIMIT)
}

async function updateStationList(q: string) {
  if (q === '') return
  const stations = await getStationList(q)
  if (!stations.ok) {
    toastStore.addToast({ text: 'No station found', type: 'Error' })
    return
  }
  stationList.value = stations.data.flatMap(value => {
    return `${value.stationName} - ${value.stationCode}`
  })
}

function onAutocompleteItemClick(data: string) {
  if (!data) {
    stationInputText.value = ''
    stationCode = ''
    return
  }
  stationInputText.value = data
  stationCode = data.split(' - ')[1]
  searchStationInfo()
}

async function searchStationInfo() {
  if (!formValidation()) return
  const res = await client.stations.getStations(stationCode)
  if (!res.ok) return
  stationInfo.value = res.data[0]
}
</script>

<template>
  <main>
    <section class="search-schedule-form-container">
      <Autocomplete
        id="station-input"
        class="station-input-container"
        name="station"
        label="Station code/name"
        v-model:text="stationInputText"
        @onKeyUp="updateStationList"
        :autocompleteList="stationList"
        @onAutocompleteItemClick="onAutocompleteItemClick">
        <img alt="" class="logo" src="@/assets/station.svg" />
      </Autocomplete>
      <button class="search-button" type="button" @click="searchStationInfo">Search Station</button>
    </section>
    <section class="train-info" v-if="stationInfo">
      <div v-for="(item, index) in stationObjToArr" :key="index" class="grid-2">
        <span class="label">{{ item[0] }}</span>
        <span class="value">{{ item[1] }}</span>
      </div>
    </section>
  </main>
</template>

<style scoped>
.station-input-container {
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
