<script setup lang="ts">
import TrainsbtwstationsForm from '@/components/TrainsbtwstationsForm.vue'
import { RouterLink } from 'vue-router'

const trainInfoServices = [
  { text: 'Trains btw stations', route: '/', imgSrc: '/src/assets/location-dot-solid.svg' },
  { text: 'Train schedule', route: '/', imgSrc: '/src/assets/train-schedule.svg' },
  { text: 'Train Info', route: '/', imgSrc: '/src/assets/train-info.svg' },
  { text: 'Station Info', route: '/', imgSrc: '/src/assets/station.svg' },
]

const popularTrains = [
  { trainNumber: '12650', trainName: 'Train name' },
  { trainNumber: '12650', trainName: 'Train name' },
  { trainNumber: '12650', trainName: 'Train name' },
  { trainNumber: '12650', trainName: 'Train name' },
]

const popularRoutes = [
  {
    fromStationName: 'Delhi',
    fromStationCode: 'NZM',
    toStaitonName: 'Mumbai',
    toStationCode: '',
  },
  {
    fromStationName: 'Delhi',
    fromStationCode: 'NZM',
    toStaitonName: 'Mumbai',
    toStationCode: '',
  },
  {
    fromStationName: 'Delhi',
    fromStationCode: 'NZM',
    toStaitonName: 'Mumbai',
    toStationCode: '',
  },
  {
    fromStationName: 'Delhi',
    fromStationCode: 'NZM',
    toStaitonName: 'Mumbai',
    toStationCode: '',
  },
]
</script>

<template>
  <main>
    <section class="tbs-section">
      <TrainsbtwstationsForm />
    </section>
    <section class="grid-2">
      <h3>Train services</h3>
      <div v-for="(item, index) in trainInfoServices" :key="index">
        <RouterLink class="link" :to="item.route">
          <img alt="" class="logo" :src="item.imgSrc" />
          {{ item.text }}
        </RouterLink>
      </div>
    </section>
    <section class="grid-2">
      <h3>Popular Trains</h3>
      <div v-for="item in popularTrains" :key="item.trainNumber">
        <RouterLink class="link overflow-ellipsis" :to="'/'">
          {{ item.trainNumber }} - {{ item.trainName }}
        </RouterLink>
      </div>
    </section>
    <section class="grid-2">
      <h3>Popular Routes</h3>
      <div v-for="(item, index) in popularRoutes" :key="index">
        <RouterLink class="link overflow-ellipsis" :to="'/'">
          {{ item.fromStationName }} to {{ item.toStaitonName }}
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
section {
  margin-bottom: 3em;
  width: 100%;
}

section > * {
  min-width: 0px;
}

.tbs-section {
  padding: 1em;
  padding-top: 2em;
  min-height: 20em;
  background-color: var(--white);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1em;
}
h3 {
  padding: 5px;
  font-size: 2rem;
  grid-area: 1 / 1 /1/ 3;
}
.grid-2 > div {
  border-radius: 0.5em;
  height: 3.5em;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
}

.link {
  height: 100%;
  margin: 0 10px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  font-size: 0.9rem;
}
.link:hover {
  color: rgb(98, 113, 157);
}

.logo {
  height: 1.5em;
  padding-right: 10px;
}
</style>
