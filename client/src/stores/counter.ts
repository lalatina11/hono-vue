import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const useThemeStore = defineStore('theme', () => {
  const theme = useLocalStorage("theme", "silk")
  const setTheme = (newTheme: "silk" | "dim") => {
    theme.value = newTheme
  }
  return { theme, setTheme }
})
