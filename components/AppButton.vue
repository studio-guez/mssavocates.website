<template>
  <component
    :is="linkTag"
    class="v-app-button"
    :href="href"
    :to="to"
    :class="[variant, { 'is-selected': selected }]"
    @click="$emit('click')"
  >
    <slot>{{ label }}</slot>
  </component>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps<{
  label?: string
  selected?: boolean
  to?: string
  href?: string
  variant?: 'outlined' | 'outlined-white'
}>()

defineEmits<{
  (e: 'click'): void
}>()

const linkTag = computed(() => {
  if (props.to) return 'NuxtLink'
  if (props.href) return 'a'
  return 'button'
})
</script>

<style scoped lang="scss">
.v-app-button {
  border-radius: var(--radius-full);
  padding: var(--space-xs) var(--space-m);
  min-width: 5rem;
  font-family: var(--font-Inter);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border: 2px solid;
}

.v-app-button.outlined {
  background: transparent;
  border-color: var(--color-pink);
  color: var(--color-pink);

  &:hover {
    background: var(--color-pink);
    color: var(--color-white);
  }
}

.v-app-button.outlined-white {
  background: var(--color-white);
  border-color: var(--color-white);
  color: var(--color-pink);

  &:hover {
    background: var(--color-pink);
    color: var(--color-white);
  }
}

.v-app-button.is-selected {
  background: var(--color-pink);
  color: var(--color-white);
  border-color: var(--color-white);
}
</style>
