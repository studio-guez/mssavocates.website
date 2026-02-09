<template>
  <section  class="v-style-block"
            :class="[
              { 'is-fill': isFill },
              {'with-over-effect': withOverEffect},
            ]"
  >
    <div
      v-if="withDivider"
      class="v-style-block__divider"
      :class="[`is-${dividerPosition}`, { 'is-short': isShortDivider }]"
    />
    <slot />
  </section>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  withDivider?: boolean
  isFill?: boolean
  dividerPosition?: 'center' | 'leftSplit'
  isShortDivider?: boolean
  withOverEffect?: boolean
}>(), {
  withOverEffect: false,
})
</script>

<style scoped lang="scss">
.v-style-block {
  position: relative;
  background-color: var(--color-white);
  border-radius: var(--radius-l);
  padding: var(--space-xl) var(--space-l); // desktop : un peu d’air
  width: 100%;
  box-sizing: border-box;
  border: 0.05rem solid var(--color-pink);

  @media (max-width: 900px) {
    padding: var(--space-m) var(--space-s); // mobile : plus compact
  }



  &.with-over-effect {

    &:hover {
      box-shadow: 0 0 0 1px var(--color-white);
      background-color: var(--color-pink);

      .v-style-block__divider {
        background-color: var(--color-white);
      }
    }
  }
}

.v-style-block.is-fill {
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0;
  margin-right: 0;
}

.v-style-block__divider {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 0.05rem;
  background-color: var(--color-pink);
  z-index: 1;
  pointer-events: none;

  &.is-center {
    left: 50%;
    transform: translateX(-50%);
  }

  &.is-leftSplit {
    left: calc(100% * 4 / 6); // Sépare 4 colonnes texte et 2 colonnes articles
    transform: translateX(-50%);
  }

  @media (max-width: 900px) {
    display: none; // On cache la ligne en responsive si besoin
  }
}

.v-style-block__divider.is-short {
  top: 5%;
  bottom: 5%;
}
</style>
