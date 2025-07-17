<template>
  <button
    class="v-app-button outlined"
    :class="{ 'is-selected': selected }"
    @click="$emit('click')"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps<{
  label?: string
  selected?: boolean
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

<style scoped lang="scss">
.v-app-button {
  border-radius: 100px;
  padding: 0.3rem 1rem;
  min-width: 6rem;
  font-family: 'InterDisplay', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &.outlined {
    background: transparent;
    border: 2px solid #f94be4;
    color: #f94be4;

    &:hover {
      background: #f94be4;
      color: white;
    }
  }

  &.is-selected {
    background: #f94be4;
    color: white;
    border-color: #f94be4;
  }
}
</style>
