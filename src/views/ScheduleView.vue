<script setup lang="ts">
import TrainForm from '@/components/TrainForm.vue'
import { useTrainStore } from '@/stores/trainStore'
import client from '@/util/ApiClient'
import { type ScheduleInfo } from 'api-railway'
import { onMounted, ref } from 'vue'
import { HHMMtoMinutes } from '@/util'

const trainStore = useTrainStore()

const schedule = ref<ScheduleInfo['schedule']>()
const trainInfo = ref<{ trainNumber: string; trainName: string }>({
  trainName: '',
  trainNumber: '',
})

async function searchSchedule() {
  const res = await client.schedules.getSchedules(trainStore.trainNumber)
  schedule.value = res.data[0].schedule
  trainInfo.value.trainName = res.data[0].trainName
  trainInfo.value.trainNumber = res.data[0].trainNumber
}

onMounted(() => {
  if (trainStore.redirected === true) searchSchedule()
  trainStore.redirected = false
})
</script>

<template>
  <main>
    <section class="search-schedule-form-container">
      <TrainForm @on-train-search="searchSchedule" />
    </section>
    <section class="train-info">
      <span class="train-number"> {{ trainInfo.trainNumber }}</span>
      <span class="train-name"> {{ trainInfo.trainName }}</span>
    </section>
    <section class="schedule-container">
      <div class="train-timetable-row table-heading" v-if="schedule">
        <div>Station</div>
        <div>
          Arrive
          <br />
          Depart
        </div>
        <div>Halt</div>
        <div>Distance</div>
        <div class="overflow-ellipsis">Platform</div>
      </div>
      <div v-for="item in schedule" :key="item.stationCode" class="train-timetable-row">
        <div class="overflow-ellipsis">
          {{ item.stationName }}
          <br />
          {{ item.stationCode }}
        </div>
        <div class="overflow-ellipsis">
          {{ item.arrivalTime ? item.arrivalTime : 'START' }}
          <br />
          {{ item.departureTime ? item.departureTime : 'END' }}
        </div>
        <div class="overflow-clip">
          {{ item.haltTime ? `${HHMMtoMinutes(item.haltTime)} min` : '-' }}
        </div>
        <div>
          {{ Math.round(parseFloat(item.distance)) }} km
          <br />
          (day {{ item.dayCount }})
        </div>
        <div>{{ item.platform }}</div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.train-info {
  font-weight: bolder;
  display: flex;
  justify-content: space-between;
  margin: 1em 0;
}

.schedule-container {
  font-size: 0.8rem;
  text-align: center;
}
.train-timetable-row.table-heading {
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.2);
  /* color: white; */
}

.train-timetable-row {
  height: 3rem;
  display: grid;
  grid-template-columns: 2fr 1fr 0.6fr 1fr 0.6fr;
  gap: 10px;
  align-items: center;
  align-content: center;
  border-bottom: 1px lightslategray solid;
}

.train-timetable-row > div {
  overflow: hidden;
}

.train-timetable-row > :first-child {
  margin-left: 10px;
}
</style>
@/stores/trainStore
