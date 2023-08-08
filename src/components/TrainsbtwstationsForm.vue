<script setup lang="ts">
import Autocomplete from '@/components/AutocompleteComponent.vue'
import DatepickerComponent from '@/components/DatepickerComponent.vue'
</script>
<template>
  <Autocomplete
    id="from-station"
    class="station-input-container"
    name="fromStation"
    label="From station">
    <img alt="" class="logo" src="@/assets/waiting.png" />
  </Autocomplete>

  <Autocomplete id="to-station" class="station-input-container" name="toStation" label="To station">
    <img alt="" class="logo" src="@/assets/arrived.png" />
  </Autocomplete>

  <DatepickerComponent class="date-input-container" />

  <button class="search-button" type="button">Search Trains</button>
</template>

<style scoped>
.station-input-container {
  /* background-color: violet; */
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 1em;
  width: 100%;
  height: 3em;
  font-size: larger;
}

.date-input-container {
  /* background-color: violet; */
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 1em;
  width: 100%;
  height: 3em;
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
