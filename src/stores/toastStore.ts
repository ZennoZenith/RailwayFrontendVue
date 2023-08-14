import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export type Toast = {
  type: 'Error' | 'Warning' | 'Info' | 'Success'
  text: string | number
  persistent?: boolean
}

const toastHistory: Toast[] = []
export const useToastStore = defineStore('toasts', () => {
  const toasts = ref<(Toast & { id: number })[]>([])
  const TOAST_TIMEOUT_MS = 5000
  let id = 0
  function addToast(toast: Toast) {
    id++
    toastHistory.unshift({ ...toast })
    toasts.value.unshift({ ...toast, id })

    if (toast.persistent === true) return
    const localId = id
    setTimeout(function () {
      removeToast(localId)
    }, TOAST_TIMEOUT_MS)
  }

  function removeToast(toastId?: number) {
    if (!toastId) {
      toasts.value.pop()
      return
    }
    toasts.value = toasts.value.filter(function (toast) {
      return toast.id !== toastId
    })
  }

  const hasToast = computed(function () {
    return toasts.value.length !== 0
  })

  return { toasts, addToast, removeToast, hasToast, TOAST_TIMEOUT_MS }
})
