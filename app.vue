<template>
  <div>
    <AppIntroAnimation
      :is_data_loaded="isInitialDataLoaded"
    />
    <NuxtLayout>
      <NuxtPage :transition="{
        name: 'page',
        mode: 'out-in'
      }" />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { isInitialDataLoaded } = useAppLoading()

useHead({
  meta: [
    {
      name: 'description',
      content: "Donner la parole et la faire entendre. Une étude d’avocates féministes au service des luttes pour la justice."
    },
  ],
})
</script>
