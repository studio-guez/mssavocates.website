<template>
  <div class="v-app-error">
    <h2 class="light">Oups, la page n'existe pas :/</h2>
    <AppButton to="/" variant="outlined-white">Retour home</AppButton>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.v-app-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-l);
  min-height: 50vh;
  text-align: center;

  h2 {
    color: var(--color-white);
  }
}
</style>
