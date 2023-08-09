<script setup lang="ts">
import { ref } from 'vue'

// // eslint-disable-next-line vue/no-setup-props-destructure
// const { train } = defineProps(['train'])

const props = defineProps(['train', 'station'])
const train = ref(props.train)

const {
  trainNumber,
  trainName,
  trainFullName,
  trainRunsOn,
  availableClasses,
  hasPantry,
  // trainType,
  // returnTrainNumber,
  stationFrom,
  stationTo,
  distance,
  duration,
} = train.value

// const stationList = ref(props.station)
</script>
<template>
  <div class="train-card">
    <div class="train-type"></div>
    <div class="train-number-name justify-self-start">
      <div>
        <span class="train-number font-bold">{{ trainNumber }}</span> -
        <span class="train-name font-bold">{{ trainName }}</span>
      </div>
      <div class="train-full-name text-overflow" :title="trainFullName">
        {{ trainFullName }}
      </div>
    </div>
    <div class="departure-info">
      <span class="departure-time font-bold">{{ stationFrom.departureTime?.slice(0, 5) }}</span
      >&nbsp;<span class="departure-station-code">{{ stationFrom.stationCode }}</span>
      <div class="departure-station-full-name text-overflow">{{ stationFrom.stationName }}</div>
      <div class="departure-day-date">Mon, 01 Jul</div>
    </div>
    <div class="duration">{{ duration }}</div>
    <div class="distance">{{ distance }} km</div>
    <div class="arrival-info">
      <span class="arrival-time font-bold">{{ stationTo.arrivalTime?.slice(0, 5) }}</span
      >&nbsp;<span class="arrival-station-code">{{ stationTo.stationCode }}</span>
      <div class="arrival-station-full-name text-overflow">{{ stationTo.stationName }}</div>
      <div class="arrival-day-date">Mon, 01 Jul</div>
    </div>
    <div class="train-runs-on justify-self-start">
      Train runs on :
      <div class="day" :class="trainRunsOn.trainRunsOnSun === 'Y' ? 'yes-run' : 'no-run'">Sun</div>
      <div class="day" :class="trainRunsOn.trainRunsOnMon === 'Y' ? 'yes-run' : 'no-run'">Mon</div>
      <div class="day" :class="trainRunsOn.trainRunsOnTue === 'Y' ? 'yes-run' : 'no-run'">Tue</div>
      <div class="day" :class="trainRunsOn.trainRunsOnWed === 'Y' ? 'yes-run' : 'no-run'">Wed</div>
      <div class="day" :class="trainRunsOn.trainRunsOnThu === 'Y' ? 'yes-run' : 'no-run'">Thu</div>
      <div class="day" :class="trainRunsOn.trainRunsOnFri === 'Y' ? 'yes-run' : 'no-run'">Fri</div>
      <div class="day" :class="trainRunsOn.trainRunsOnSat === 'Y' ? 'yes-run' : 'no-run'">Sat</div>
    </div>
    <div class="train-class-container justify-self-start">
      <div class="train-class" v-for="classes in availableClasses" :key="classes">
        {{ classes }}
      </div>
    </div>
    <div class="has-pantry justify-self-start">
      Has pantry : <span>{{ hasPantry ? 'Yes' : 'No' }}</span>
    </div>
    <div class="show-schedule"><a>View timetable</a></div>
  </div>
</template>

<style scoped>
.justify-self-start {
  justify-self: start;
}
.train-card {
  position: relative;
  background-color: #fbd2d2;
  display: grid;
  gap: 5px;
  padding: 10px 1em;
  grid-template-columns: 2fr repeat(4, 1fr);
  justify-items: center;
  align-items: center;
  border-radius: 1rem;
}

.train-type {
  position: absolute;
  width: 20px;
  height: 100%;
  right: 18%;
  background-color: rgba(23, 23, 23, 0.3);
}

.train-runs-on {
  display: flex;
  align-items: center;
  gap: 10px;
  grid-column: 1 / 6;
}

.day {
  font-family: monospace;
  font-size: 1rem;
  padding: 4px 8px;
  width: 45px;
  border-radius: 1em;
  text-align: center;
}

.no-run {
  background-color: rgba(255, 65, 36, 0.7);
}

.yes-run {
  background-color: rgba(78, 255, 80, 0.7);
}

.train-class-container {
  grid-column: 1 / 6;
  display: flex;
  align-items: center;
  gap: 10px;
}

.train-class {
  background-color: #d9d9d9;
  padding: 10px 15px;
  text-align: center;
  border-radius: 2em;
}

.has-pantry {
  grid-column-start: 1;
}

.show-schedule {
  grid-column-start: 5;
  justify-self: end;
}

.font-bold {
  font-weight: bold;
}

.text-overflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.train-number-name {
  min-width: 0;
  width: 100%;
}
</style>
