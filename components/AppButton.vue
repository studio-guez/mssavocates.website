<template>
    <section class="v-app-button"
    >
      {{message}}
    </section>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
    message?: string
}>()
</script>





<style lang="scss" scoped >
.v-app-button {
  display: inline-block;
  background: lightgrey;
  border-radius: 1rem;
  padding: .5rem 1rem;
  border: 1px solid black;
  user-select: none;
}
</style>
