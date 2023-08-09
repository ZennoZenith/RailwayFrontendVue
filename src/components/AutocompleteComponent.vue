<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue'
import { onMounted, ref } from 'vue'

const props = defineProps({
  placeholder: {
    type: String,
    default: '',
  },
  name: String,
  label: String,
  inputClass: {
    type: String,
  },
  id: {
    type: String,
    required: true,
  },
  text1: { type: String, default: '' },
  text2: { type: String, default: '' },
})

const emits = defineEmits(['update:text1', 'update:text2'])

const inputElement = ref<InputHTMLAttributes | null>(null)
const isFocused = ref(false)

onMounted(() => {
  if (props.text1 != '') isFocused.value = true
})

function animateLabel(focusState: string = '') {
  if (focusState === 'Focused') {
    isFocused.value = true
    return
  }
  if (props.text1 != '') isFocused.value = true
  else isFocused.value = false
}

function clearInputText() {
  emits('update:text1', '')
  isFocused.value = false
  if (inputElement.value) inputElement.value.value = ''
}

function onValueChange() {
  animateLabel()
  return props.text1
}
</script>

<template>
  <div class="default-container">
    <label class="default-label" :class="{ 'label-focus': isFocused }" :for="id">
      {{ label }}
    </label>
    <slot></slot>
    <input
      ref="inputElement"
      type="text"
      :id="id"
      :name="name"
      :placeholder="placeholder"
      :class="inputClass"
      :value="onValueChange()"
      @input="$emit('update:text1', ($event.target as InputHTMLAttributes).value)"
      class="default-input"
      @focusin="animateLabel('Focused')"
      @focusout="animateLabel()" />
    <span class="cross" @click="clearInputText">&#x2A09;</span>
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
  /* border: 2px solid black; */
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
</style>
