<template>
  <div>
    <AppIntroAnimation
      :is-data-loaded="isInitialDataLoaded"
    />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { isInitialDataLoaded } = useAppLoading()
</script>
