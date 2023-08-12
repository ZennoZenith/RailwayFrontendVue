<script setup lang="ts">
import { RouterLink } from 'vue-router'

import Routes, { routes } from '@/router'
import { type TrainsBtwStationsType } from 'api-railway'
import IconRightAngle from '@/components/icons/IconRightAngle.vue'
import IconDuration from '@/components/icons/IconDuration.vue'
import { ref } from 'vue'

import { useScheduleStore } from '@/stores/scheduleStore'
const scheduleStore = useScheduleStore()

const props = defineProps<{ train: TrainsBtwStationsType }>()
const train = ref(props.train)

const {
  trainNumber,
  trainName,
  availableClasses,
  hasPantry,
  trainType,
  stationFrom,
  stationTo,
  distance,
  duration,
  trainRunsOn,
} = train.value

// const stationList = ref(props.station)

const trainRunsOnDays = [
  ['sunday', 'S', 'Sun'],
  ['monday', 'M', 'Mon'],
  ['tueday', 'T', 'Tue'],
  ['wednesday', 'W', 'Wed'],
  ['thursday', 'T', 'Thu'],
  ['friday', 'F', 'Fri'],
  ['saturday', 'S', 'Sat'],
] as const

function trainTypeColor(trainType: string): string {
  if (trainType === 'EXP') return 'blue'
  return 'black'
}

function onClickTrainSchedule() {
  scheduleStore.trainNumber = trainNumber
  scheduleStore.trainName = trainName
  scheduleStore.redirected = true
  Routes.push(routes.schedule)
}
</script>
<template>
  <div class="train-card">
    <div class="train-type" :style="{ backgroundColor: trainTypeColor(trainType) }"></div>
    <section class="tr-number-name-runs">
      <span class="train-number">{{ trainNumber }}</span> &nbsp; | &nbsp;
      <span class="train-name">{{ trainName }}</span> &nbsp;
      <span @click="onClickTrainSchedule" class="link"> <IconRightAngle class="svg" /> </span>
      <section class="train-runs-on">
        <span
          v-for="trainRunsOnDay in trainRunsOnDays"
          :key="trainRunsOnDay[2]"
          class="day"
          :class="{ 'yes-run': trainRunsOn[trainRunsOnDay[0]] }">
          {{ trainRunsOnDay[1] }}
        </span>
      </section>
    </section>
    <section class="departure-duration-arrival">
      <div class="departure-time-station">
        <div class="departure-time time">{{ stationFrom.departureTime!.slice(0, 5) }}</div>
        <div class="departure-station station">{{ stationFrom.stationName }}</div>
      </div>
      <div class="duration-distance">
        <div class="duration">
          <IconDuration class="duration-icon" style="transform: rotate(180deg)" />{{ duration }}
          <IconDuration class="duration-icon" />
        </div>
        <div class="distance">{{ distance }} km</div>
      </div>
      <div class="arrival-time-station">
        <div class="arrival-time time">
          {{ stationTo.arrivalTime!.slice(0, 5) }}
        </div>
        <div class="arrival-station station">{{ stationTo.stationName }}</div>
      </div>
    </section>
    <section>
      <span class="pantry"> Pantry : {{ hasPantry ? 'Yes' : 'No' }} </span>
      <section class="classes">
        <span class="class" v-for="_class in availableClasses.sort()" :key="_class">
          {{ _class }}
        </span>
      </section>
    </section>
  </div>
</template>

<style scoped>
.train-card {
  position: relative;
  margin: 1em 0;
  padding: 1em 0.5em;
  border-radius: 1em;
  border: solid 1px rgba(0, 0, 0, 0.5);
}

.train-type {
  display: none;
  position: absolute;
  opacity: 0.2;
  height: 100%;
  width: 1.5em;
  right: 0;
  bottom: 0;
  border-top-right-radius: 1em;
  border-bottom-right-radius: 1em;
}
.tr-number-name-runs {
  display: flex;
  align-items: center;
  font-weight: bold;
  white-space: nowrap;

  /* justify-content: center; */
}

svg {
  height: 1rem;
}
.link {
  padding: 0 10px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  /* font-size: smaller; */
}
.link:hover {
  color: rgb(98, 113, 157);
}

.train-runs-on {
  margin-left: auto;
  display: flex;
  gap: 3px;
}
.day {
  color: rgba(0, 0, 0, 0.5);
}
.yes-run {
  color: rgb(241, 90, 34);
}

.departure-duration-arrival {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* justify-content: space-between; */
}

.departure-time-station {
  text-align: left;
}

.duration-distance {
  text-align: center;
  font-size: smaller;
  opacity: 0.5;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.duration {
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.duration-icon {
  height: 0.5rem;
}

.arrival-time-station {
  text-align: right;
}

.time {
  font-weight: bolder;
}
.station {
  font-size: smaller;
  white-space: nowrap;
}

.classes {
  position: absolute;
  right: 0.5em;
  display: inline-flex;
  flex-flow: row wrap;
  gap: 5px;
}

.class {
  border: solid rgba(0, 0, 0, 0.5) 1px;
  border-radius: 7px;
  padding: 0 5px;
}
</style>
