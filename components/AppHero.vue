<template>
  <section class="v-app-hero">
    <h3>{{v_app_hero_data.titre}}</h3>
    <h3>{{v_app_hero_data.texte}}</h3>

    
  </section>
</template>



<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  v_app_hero_data: CMS_API_hero
}>()
</script>





<style lang="scss" scoped >
.v-app-hero {
}
</style>
