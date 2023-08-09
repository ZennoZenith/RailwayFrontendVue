<script setup lang="ts">
import Autocomplete from '@/components/AutocompleteComponent.vue'
import DatepickerComponent from '@/components/DatepickerComponent.vue'
import { ref } from 'vue'

const fromStationName = ref('')
const toStationName = ref('')
const fromStationCode = ref('')
const toStationCode = ref('')
const date = ref('')

function swap() {
  let temp = fromStationName.value
  fromStationName.value = toStationName.value
  toStationName.value = temp
  temp = fromStationCode.value
  fromStationCode.value = toStationCode.value
  toStationCode.value = temp
}
</script>
<template>
  <Autocomplete
    id="from-station"
    class="station-input-container"
    name="fromStation"
    label="From station"
    :text1="fromStationName"
    :text2="fromStationCode">
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
    :text1="toStationName"
    :text2="toStationCode">
    <img alt="" class="logo" src="@/assets/arrived.png" />
  </Autocomplete>
  <div class="line"></div>
  <DatepickerComponent class="date-input-container" :date="date" />
  <div class="line"></div>

  <button class="search-button" type="button">Search Trains</button>
</template>

<style scoped>
.line {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  position: relative;
}
.station-input-container {
  width: 100%;
  height: 4em;
  font-size: 1.2rem;
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
