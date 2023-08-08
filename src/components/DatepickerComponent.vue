<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps({
  name: String,
  initialInputText: { type: String, default: '' },
})

const date = ref(props.initialInputText)
const currentDateObj = new Date()

const oneDaysInMiliseconds = 1000 * 60 * 60 * 24
const tomorrowDate = new Date(currentDateObj.valueOf() + oneDaysInMiliseconds)
const overmorrowDate = new Date(currentDateObj.valueOf() + oneDaysInMiliseconds * 2)

onMounted(() => {
  if (date.value == '') {
    date.value = inputDateFormat(currentDateObj)
  }
})

function inputDateFormat(date: Date) {
  let day = date.getDate(),
    month = date.getMonth() + 1,
    year = date.getFullYear()
  let monthStr = month.toString()
  let dayStr = day.toString()
  if (month < 10) monthStr = '0' + month.toString()
  if (day < 10) dayStr = '0' + day.toString()

  return `${year}-${monthStr}-${dayStr}`
}

function customDateFormat(date: Date) {
  const monthArr = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  let month = date.getMonth()
  let day = date.getDate()
  let dayStr = day.toString()
  if (day < 10) dayStr = '0' + day.toString()

  return `${dayStr} ${monthArr[month]}`
}

function setDate(dateOption: string) {
  if (dateOption === 'tomorrow') date.value = inputDateFormat(tomorrowDate)
  else if (dateOption === 'overmorrow') date.value = inputDateFormat(overmorrowDate)
}
</script>

<template>
  <div class="default-container">
    <slot> &#x1F4C5; </slot>
    <input class="date" ref="input" type="date" :name="name" v-model.trim="date" />
    <span class="date-extra" @click="setDate('tomorrow')">
      {{ customDateFormat(tomorrowDate) }} Tomorrow</span
    >
    <span class="date-extra" @click="setDate('overmorrow')"
      >{{ customDateFormat(overmorrowDate) }} Day After</span
    >

    <!-- :min="`${year}-${monthStr}-${dayStr}`"
      :max="`${year}-${(Number(monthStr) + 2) % 12}-${dayStr}`"  -->
  </div>
</template>

<style scoped>
.default-container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
}
.date {
  flex-grow: 1;
}
.date-extra {
  cursor: pointer;
  font-size: 0.7rem;
  color: rgba(0, 0, 0, 0.5);
  padding: 0 5px;
  width: 20%;
  height: 70%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}
</style>
