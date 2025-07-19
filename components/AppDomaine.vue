<template>
    <section class="v-app-domaine">
      <div v-for="domaine in v_app_domaine_data.domaines">
        <h3>{{ domaine.titre }}</h3>
        <p>{{ domaine.description }}</p>
<!--               <img
             :src="v_app_team_data.image.reg.url"
      /> -->
      </div>
    </section>
  </template>
  
  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  
  const props = defineProps<{
    v_app_domaine_data: CMS_API_domaines_activite
  }>()
  </script>
  
  
  
  
  
  <style lang="scss" scoped >

  </style>
  