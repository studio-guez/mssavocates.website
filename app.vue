<template>
  <div>
    <AppIntroAnimation
      :is_data_loaded="isInitialDataLoaded"
    />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { isInitialDataLoaded } = useAppLoading()
</script>
