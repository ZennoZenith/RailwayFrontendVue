import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { TrainGeneralInfo } from 'api-railway'

export const useScheduleStore = defineStore('trainsBtwStations', () => {
  const trainNumber = ref('')
  const trainName = ref('')
  const trainList = ref<TrainGeneralInfo[]>()
  const redirected = ref(false)

  return {
    trainNumber,
    trainList,
    trainName,
    redirected,
  }
})
