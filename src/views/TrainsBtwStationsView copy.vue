<script setup lang="ts">
import TrainsBtwStationForm from '@/components/TrainsbtwstationsForm.vue'
import TrainCard from '@/components/TrainCard.vue'
import { debounce } from '@/util'

// import { type LooseObject } from '../index'

const props = defineProps({
  initialData: { type: Object, required: true },
  stationList: { type: Array<string>, required: true },
})

import { onMounted, ref, type Ref } from 'vue'

const trainList: Ref<any[]> = ref([])
// let stationList: any[] = []

const fetchDebounceStationList = debounce(function (text: string) {
  console.log(text)
})

async function fetchData(formValues: {
  date: string
  fromStationCode: string
  toStationCode: string
}) {
  const URL = `http://localhost:5000/trainsBtwStations?fromStation=${formValues.fromStationCode}&toStation=${formValues.toStationCode}&date=${formValues.date}&allTrains=true`
  const res = await fetch(URL)
  const data = await res.json()
  renderData(data)
}

onMounted(() => {
  renderData(props.initialData.trainList)
})

function renderData(data: any) {
  trainList.value = data.trainsInfo
  // stationList = data.stationsInfo
}
</script>

<template>
  <main class="main">
    <div class="form-container">
      <TrainsBtwStationForm
        :initial-from-station="props.initialData.fromStation"
        :initial-to-station="props.initialData.toStation"
        :initial-date="props.initialData.date"
        @onFormSubmit="fetchData"
        @onFromStationChange="fetchDebounceStationList"
        @onToStationChange="fetchDebounceStationList"
        :stationList="stationList" />
    </div>

    <form class="filters-container">
      <header class="filter-header">
        <div>Refine result :</div>
        <div><button type="reset">Reset filter</button></div>
      </header>
      <div>
        <header class="filter-header">
          <div>JOURNEY CLASS</div>
          <button>Select all</button>
        </header>
        <ul class="filter-grid-2">
          <li>
            <input type="checkbox" name="journey-class" id="ac-first" value="1A" checked />
            <label for="ac-first">AC First Class (1A)</label>
          </li>
          <li>
            <input type="checkbox" name="journey-class" id="ac-second" value="2A" checked />
            <label for="ac-second"> AC 2 Tier (2A) </label>
          </li>
          <li>
            <input type="checkbox" name="journey-class" id="second-sitting" value="2S" checked />
            <label for="second-sitting"> Second Sitting (2S) </label>
          </li>
        </ul>
      </div>
      <div>
        <header class="filter-header">
          <div>TRAIN TYPE</div>
          <button>Select all</button>
        </header>
        <ul>
          <li>Anubhuti Class (EA)</li>
          <li>AC First Class (1A)</li>
          <li>Vistadome AC (EV)</li>
          <li>Exec. Chair Car (EC)</li>
          <li>AC 2 Tier (2A)</li>
          <li>First Class (FC)</li>
          <li>AC 3 Tier (3A)</li>
          <li>AC 3 Economy (3E)</li>
          <li>Vistadome Chair Car (VC)</li>
          <li>AC Chair car (CC)</li>
          <li>Sleeper (SL)</li>
          <li>Vistadome Non AC (VS)</li>
          <li>Second Sitting (2S)</li>
        </ul>
      </div>
      <div>
        <header class="filter-header">
          <div>From station:</div>
          <button>Select all</button>
        </header>
        <ul>
          <li>Katihar Jn</li>
        </ul>
      </div>
      <div>
        <header class="filter-header">
          <div>To station:</div>
          <button>Select all</button>
        </header>
        <ul>
          <li>Gwalior Jn</li>
        </ul>
      </div>
      <div class="departure-time-filter-container">
        <header class="filter-header">
          <div>Departure time</div>
          <button>Select all</button>
        </header>
        <section class="departure-time-filter filter-grid-2">
          <div>00:00 - 06:00</div>
          <div>06:00 - 12:00</div>
          <div>12:00 - 18:00</div>
          <div>18:00 - 00:00</div>
        </section>
      </div>
      <div class="arrival-time-filter-container">
        <header class="filter-header">
          <div>Arrival time</div>
          <button>Select all</button>
        </header>
        <section class="arrival-time-filter filter-grid-2">
          <div>00:00 - 06:00</div>
          <div>06:00 - 12:00</div>
          <div>12:00 - 18:00</div>
          <div>18:00 - 00:00</div>
        </section>
      </div>
    </form>

    <div class="search-result-container">
      <div class="sorting-section">
        <div class="justify-self-start">Sort by :</div>
        <div>Deparutre Time</div>
        <div>Duration</div>
        <div>Distance</div>
        <div>Arival Time</div>
      </div>
      <div class="train-cards-container">
        <!-- <TrainCard v-for="train in trainList" /> -->
        <TrainCard
          v-for="train in trainList"
          :key="train.trainNumber"
          :train="train"
          :station="stationList" />
        <!-- {{ trainList }} -->
      </div>
    </div>
  </main>
</template>

<style scoped>
.main {
  padding: 0;
  display: grid;
  grid-template-areas:
    'form-container form-container form-container form-container'
    '. filters-container result-container .';
  grid-template-columns: 0.3fr 1fr 3fr 0.3fr;
  gap: 10px;
}

.form-container {
  grid-area: form-container;
  height: 80px;
  background-color: #164b60;
  padding-top: 10px;
}

.filters-container {
  grid-area: filters-container;
  height: fit-content;
  padding: 1em;
  border-radius: 1em;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.search-result-container {
  padding: 10px;
  grid-area: result-container;
  /* background-color: aqua;*/
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.filter-header {
  border-bottom: black solid 2px;
  display: flex;
  gap: 1em;
  padding-bottom: 0.5em;
  margin-bottom: 0.5em;
}

.filter-header > :first-child {
  flex-grow: 1;
}

.filters-container ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.filter-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  justify-items: center;
}

.justify-self-start {
  justify-self: start;
}

.sorting-section {
  background-color: #d9d9d9;
  height: 40px;
  display: grid;
  gap: 5px;
  padding: 0 1em;
  grid-template-columns: 2fr repeat(4, 1fr);
  justify-items: center;
  align-items: center;
  border-radius: 1rem;
}

.train-cards-container {
  display: grid;
  gap: 0.5em;
}
</style>
