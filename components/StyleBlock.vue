<template>
  <section
    class="v-style-block"
    :class="{ 'v-style-block--with-divider': withDivider }"
  >
    <div v-if="withDivider" class="v-style-block__divider" />
    <slot />
  </section>
</template>

<script setup lang="ts">
defineProps<{
  withDivider?: boolean
}>()
</script>

   
   
   <style scoped lang="scss">
   
    .v-style-block {
  position: relative;
  background-color: var(--color-white);
  border-radius: var(--radius-l);
  padding: var(--space-xl) var(--space-xl) var(--space-xxl);
  width: 100%;
  box-sizing: border-box;
  border: 2px solid var(--color-pink);
}

.v-style-block__divider {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  background-color: var(--color-pink);
  transform: translateX(-50%);
  z-index: 1; // au-dessus du fond mais en dessous du contenu
  pointer-events: none;
}


   .v-style-block.is-fill {
  padding: 0; // on retire le padding interne pour les images pleine largeur
}




   </style>
   
   
   

   
   