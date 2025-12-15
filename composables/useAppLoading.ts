import { ref } from 'vue'

const isInitialDataLoaded = ref(false)

export const useAppLoading = () => {
  const setInitialDataLoaded = () => {
    isInitialDataLoaded.value = true
  }

  return {
    isInitialDataLoaded,
    setInitialDataLoaded
  }
}
