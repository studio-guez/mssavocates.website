<template>
    <section class="v-style-block">
      <slot />
    </section>
   </template>
   
   
   <script setup lang="ts">
   // Pas besoin de props pour l’instant
   </script>
   
   
   <style scoped lang="scss">
   .v-style-block {
    background-color: var(--color-white);
    border-radius: var(--radius-l);
    padding: var(--space-l) var(--space-xl);
    width: 100%;
    box-sizing: border-box;
    border: 2px solid var(--color-pink);
   }
   </style>
   
   
   
   
   
   