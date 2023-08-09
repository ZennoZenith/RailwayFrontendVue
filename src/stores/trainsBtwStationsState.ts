import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTrainsBtwStationsStore = defineStore('trainsBtwStations', () => {
  const fromStationName = ref('')
  const toStationName = ref('')
  const fromStationCode = ref('')
  const toStationCode = ref('')
  const date = ref('')
  const redirected = ref(false)

  return {
    fromStationName,
    toStationName,
    fromStationCode,
    toStationCode,
    date,
    redirected,
  }
})
