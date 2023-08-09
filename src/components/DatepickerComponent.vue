<script setup lang="ts">
import { onMounted, ref, type InputHTMLAttributes } from 'vue'

const props = defineProps({
  name: String,
  date: { type: String, default: '' },
})
const emits = defineEmits(['update:date'])

const dateElement = ref<InputHTMLAttributes | null>(null)
const currentDateObj = new Date()

const oneDaysInMiliseconds = 1000 * 60 * 60 * 24
const tomorrowDate = new Date(currentDateObj.valueOf() + oneDaysInMiliseconds)
const overmorrowDate = new Date(currentDateObj.valueOf() + oneDaysInMiliseconds * 2)

onMounted(() => {
  if (props.date == '') {
    emits('update:date', inputDateFormat(currentDateObj))
    dateElement.value!.value = inputDateFormat(currentDateObj)
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
  if (dateOption === 'tomorrow') {
    dateElement.value!.value = inputDateFormat(tomorrowDate)
    emits('update:date', inputDateFormat(tomorrowDate))
  } else if (dateOption === 'overmorrow') {
    dateElement.value!.value = inputDateFormat(overmorrowDate)
    emits('update:date', inputDateFormat(overmorrowDate))
  }
}
</script>

<template>
  <div class="default-container">
    <slot> &#x1F4C5; </slot>
    <input
      class="date"
      ref="dateElement"
      type="date"
      :name="name"
      :value="date"
      @input="$emit('update:date', ($event.target as InputHTMLAttributes).value)" />
    <span
      class="date-extra"
      :class="{ selected: date === inputDateFormat(tomorrowDate) }"
      @click="setDate('tomorrow')">
      {{ customDateFormat(tomorrowDate) }} Tomorrow</span
    >
    <span
      class="date-extra"
      :class="{ selected: date === inputDateFormat(overmorrowDate) }"
      @click="setDate('overmorrow')"
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
  outline: none;
}
.date:focus {
  outline: none;
}

.date-extra {
  text-align: center;
  cursor: pointer;
  font-size: 0.7rem;
  color: rgba(0, 0, 0, 0.5);
  padding: 5px 5px;
  width: 20%;
  /* height: 60%; */
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}

.selected {
  color: white;
  background-color: rgb(241, 110, 34);
}
</style>
