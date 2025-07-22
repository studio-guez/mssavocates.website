<template>
  <section class="v-app-team">
    <img :src="v_app_team_data.image.reg.url" />
    <h3>{{ v_app_team_data.prenom }}</h3>
    <h3>{{ v_app_team_data.nom }}</h3>
  </section>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  v_app_team_data: CMS_API_people
}>()
</script>





<style lang="scss" scoped>
.v-app-team {}
</style>
