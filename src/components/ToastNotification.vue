<script setup lang="ts">
import { useToastStore, type Toast } from '@/stores/toastStore'
type ArrayElement<ArrType> = ArrType extends readonly (infer ElementType)[] ? ElementType : never

const toastStore = useToastStore()
const emits = defineEmits(['onToastClosed'])
const props = defineProps<{ toast: ArrayElement<typeof toastStore.toasts> }>()

function closeToast() {
  emits('onToastClosed')
  toastStore.removeToast(props.toast.id)
}

const toastTypeIcon: Record<Toast['type'], string> = {
  Error: '❌',
  Info: 'ℹ️',
  Warning: '⚠️',
  Success: '✅',
}
</script>

<template>
  <div
    class="toast"
    :class="{
      'toast-type-info': toast.type === 'Info',
      'toast-type-error': toast.type === 'Error',
      'toast-type-warning': toast.type === 'Warning',
      'toast-type-success': toast.type === 'Success',
    }">
    <div class="icon">
      {{ toastTypeIcon[toast.type] }}
    </div>
    <div class="toast-content">
      <span class="toast-type">
        {{ toast.type }}
      </span>
      <span class="message">
        <slot> Default toast </slot>
      </span>
    </div>
    <button type="button" class="close-button" @click="closeToast">⨉</button>
    <div
      class="remaining-time"
      :style="{
        animationDuration: toast.persistent ? '0s' : `${toastStore.TOAST_TIMEOUT_MS}ms`,
      }"></div>
  </div>
</template>

<style scoped>
.toast {
  position: relative;
  padding: 10px;
  flex-shrink: 1;
  min-width: 0;
  width: fit-content;
  margin-left: auto;
  display: grid;
  border-radius: 10px;
  border-radius: 10px;
  grid-template-columns: 2em auto 2em;
  z-index: 1;
  /* https://stackoverflow.com/questions/5736503/how-to-make-css3-rounded-corners-hide-overflow-in-chrome-opera */
  /* transform: translateZ(0); */
  mask-image: -webkit-radial-gradient(circle, white 100%, black 100%);
}

.icon {
  font-size: 1.2rem;
  margin: auto 0;
}
.toast-type {
  font-weight: bold;
}

.toast-content > * {
  display: block;
  text-align: left;
}

.message {
  max-height: 5rem;
  overflow: hidden;
  text-overflow: clip;
}

.close-button {
  font-size: 1.2rem;
}

@keyframes width-animate {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
.remaining-time {
  position: absolute;
  width: 100%;
  height: 4px;
  background-color: blueviolet;
  bottom: 0;
  right: 0;
  left: 0;
  position: absolute;
  overflow: hidden;
  animation-timing-function: linear;
  animation-name: width-animate;
  animation-fill-mode: forwards;
}

.toast-type-success {
  background-color: rgb(183, 247, 196);
}
.toast-type-info {
  background-color: rgb(179, 230, 245);
}
.toast-type-error {
  background-color: rgb(255, 183, 182);
}
.toast-type-warning {
  background-color: rgb(251, 231, 198);
}
</style>
