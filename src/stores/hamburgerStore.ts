import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useHamburgerStore = defineStore('hamburger', () => {
  const isHamburgerOpen = ref(false)

  function negateHamburger() {
    isHamburgerOpen.value = !isHamburgerOpen.value
  }

  function hamburgerState() {
    return isHamburgerOpen.value
  }

  return { isHamburgerOpen, negateHamburger, hamburgerState }
})
