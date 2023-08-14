<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue'
import { watch } from 'vue'
import { onMounted, ref } from 'vue'

interface Props {
  placeholder?: string
  name: string
  label: string
  id: string
  text?: string
  autocompleteList?: any[]
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  text: '',
  autocompleteList: () => [],
})

const emits = defineEmits(['onAutocompleteItemClick', 'update:text', 'onKeyUp'])

const inputElement = ref<HTMLInputElement | null>(null)
const shouldLabelBeFocusedState = ref(false)
const showAutoSuggest = ref(false)

onMounted(() => {
  if (props.text != '') shouldLabelBeFocusedState.value = true
  animateLabel()
})

function animateLabel() {
  if (inputElement.value === document.activeElement) {
    shouldLabelBeFocusedState.value = true
    if (inputElement.value?.value !== '') showAutoSuggest.value = true
    return
  }
  showAutoSuggest.value = false

  if (props.text != '') shouldLabelBeFocusedState.value = true
  else shouldLabelBeFocusedState.value = false
}

function clearInputText() {
  emits('onAutocompleteItemClick', undefined)
  emits('update:text', '')
  // shouldLabelBeFocusedState.value = true
  if (inputElement.value) {
    inputElement.value.focus()
    inputElement.value.value = ''
  }
}

function onAutocompleteItemClick(item: any) {
  emits('update:text', item.text)
  emits('onAutocompleteItemClick', item)
}

watch(props, () => {
  animateLabel()
})
function onKeyDown() {
  showAutoSuggest.value = true
}
</script>

<template>
  <div class="default-container">
    <label
      class="default-label overflow-clip"
      :class="{ 'label-focus': shouldLabelBeFocusedState }"
      :for="id">
      {{ label }}
    </label>
    <slot></slot>
    <input
      ref="inputElement"
      type="text"
      :id="id"
      :name="name"
      :value="text"
      :placeholder="placeholder"
      @keydown="onKeyDown"
      @input="$emit('update:text', ($event.target as InputHTMLAttributes).value)"
      class="default-input"
      @focusin="animateLabel()"
      @focusout="animateLabel()"
      @keyup="$emit('onKeyUp', ($event.target as InputHTMLAttributes).value)" />
    <span class="cross" @click="clearInputText">&#x2A09;</span>
    <Transition>
      <div v-show="showAutoSuggest" class="autocomplete-items">
        <div
          v-for="(item, index) in autocompleteList"
          :key="index"
          @click="onAutocompleteItemClick(item)">
          <span v-if="item.text !== undefined"> {{ item.text }}</span>
          <span v-else>{{ item }}</span>
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
  border-radius: 2000px;
  translate: 2em 0px;
  scale: 1;
  background-color: white;
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
