import { ref, computed, watch, watchEffect } from 'vue'
import { debounce } from '@/util'
import { defineStore } from 'pinia'

import { type StationGeneralInfo } from 'api-railway'

// const debouncedStationList = debounce(getStationList)
// const [debouncedStationList, teardown] = debounce<string, ApiRetrunType<StationGeneralInfo, ErrorObj, {}>>(getStationList, ms)

export const useTrainsBtwStationsStore = defineStore('trainsBtwStations', () => {
  const fromStationName = ref('')
  const toStationName = ref('')
  const fromStationCode = ref('')
  const toStationCode = ref('')
  const date = ref('')
  const redirected = ref(false)
  const stationList = ref<StationGeneralInfo[]>()

  function resetAll() {
    fromStationName.value = ''
    toStationName.value = ''
    fromStationCode.value = ''
    toStationCode.value = ''
    date.value = ''
    redirected.value = false
    stationList.value = []
  }

  function swap() {
    let temp = fromStationName.value
    fromStationName.value = toStationName.value
    toStationName.value = temp
    temp = fromStationCode.value
    fromStationCode.value = toStationCode.value
    toStationCode.value = temp
  }

  return {
    fromStationName,
    toStationName,
    fromStationCode,
    toStationCode,
    date,
    redirected,
    swap,
    stationList,
    resetAll,
  }
})
