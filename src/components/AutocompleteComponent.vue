<script setup lang="ts">
import type { StationGeneralInfo } from 'api-railway'
import type { InputHTMLAttributes } from 'vue'
import { computed, onMounted, ref, watch } from 'vue'

interface Props {
  placeholder?: string
  name: string
  label: string
  id: string
  text1: string
  text2: string
  stationList?: StationGeneralInfo[]
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  text1: '',
  text2: '',
  stationList: () => [],
})

const emits = defineEmits(['update:text1', 'update:text2', 'onKeyUp'])

const inputElement = ref<InputHTMLAttributes | null>(null)
const shouldLabelBeFocusedState = ref(false)
const showAutoSuggest = ref(false)

onMounted(() => {
  if (props.text1 != '') shouldLabelBeFocusedState.value = true
  clearInputText
  animateLabel()
})

function animateLabel() {
  if (inputElement.value === document.activeElement) {
    shouldLabelBeFocusedState.value = true
    if (inputElement.value?.value !== '') showAutoSuggest.value = true
    return
  }
  showAutoSuggest.value = false

  if (props.text1 != '') shouldLabelBeFocusedState.value = true
  else shouldLabelBeFocusedState.value = false
}

function clearInputText() {
  emits('update:text1', '')
  emits('update:text2', '')
  shouldLabelBeFocusedState.value = false
  if (inputElement.value) inputElement.value.value = ''
}

function onValueChange() {
  animateLabel()
  return props.text1
}

function onAutocompleteItemClick(item: StationGeneralInfo) {
  emits('update:text1', `${item.stationName} - ${item.stationCode}`)
  emits('update:text2', item.stationCode)
}
</script>

<template>
  <div class="default-container">
    <label class="default-label" :class="{ 'label-focus': shouldLabelBeFocusedState }" :for="id">
      {{ label }}
    </label>
    <slot></slot>
    <input
      ref="inputElement"
      type="text"
      :id="id"
      :name="name"
      :placeholder="placeholder"
      :value="onValueChange()"
      @input="$emit('update:text1', ($event.target as InputHTMLAttributes).value)"
      class="default-input"
      @focusin="animateLabel()"
      @focusout="animateLabel()"
      @keyup="$emit('onKeyUp', ($event.target as InputHTMLAttributes).value)" />
    <span class="cross" @click="clearInputText">&#x2A09;</span>
    <Transition>
      <div v-show="showAutoSuggest" class="autocomplete-items">
        <div
          v-for="item in stationList"
          :key="item.stationCode"
          @click="onAutocompleteItemClick(item)">
          {{ `${item.stationName} - ${item.stationCode}` }}
        </div>
      </div>
    </Transition>
    <!-- ⨉ -->
  </div>
</template>

<style scoped>
.default-container {
  position: relative;
  display: flex;
  align-items: center;
}
.default-label {
  position: absolute;
  /* left: 15px;
  top: -10px; */
  translate: 2em 0px;
  scale: 1;
  /* background-color: white; */
  color: rgb(241, 90, 34);
  padding: 0 10px;
  margin: 0;
  --transistion-time: 0.3s;
  transition: var(--transistion-time) ease;
  transform-origin: top left;
  /* font-size: 0.8rem; */
}
.default-input {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0;
  padding-left: 5px;
}
.default-input:focus {
  outline: none;
}

.label-focus {
  translate: 2em -25px;
  scale: 0.9;
}

.cross {
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

/* Reference: https://www.w3schools.com/howto/howto_js_autocomplete.asp */
.autocomplete-items {
  position: absolute;
  border: 1px solid #d4d4d4;
  /* border-bottom: none;
  border-top: none; */
  z-index: 99;
  /* padding-top: 1px; */
  /*position the autocomplete items to be the same width as the container:*/
  top: 100%;
  left: 0;
  right: 0;
  max-height: 22em;
  overflow-y: scroll;
}
.autocomplete-items div {
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #d4d4d4;
}
.autocomplete-items div:hover {
  /*when hovering an item:*/
  background-color: #e9e9e9 !important;
}
.autocomplete-items div:active {
  /*when hovering an item:*/
  background-color: #e9e9e9 !important;
}

.autocomplete-active {
  /*when navigating through the items using the arrow keys:*/
  background-color: DodgerBlue !important;
  color: #ffffff;
}
</style>
