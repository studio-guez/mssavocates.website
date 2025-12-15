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
</script>
