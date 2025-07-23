<template>
<<<<<<< Updated upstream
    <section class="v-app-team"
    >
      <h3>{{v_app_team_data.nom}}</h3>
      <h3>{{v_app_team_data.prenom}}</h3>
      <img
             :src="v_app_team_data.image.reg.url"
      />
    </section>
=======
  <a href="/equipe" class="v-app-team">
<img
  :src="v_app_team_data.image.reg.url"
  :alt="`${v_app_team_data.prenom} ${v_app_team_data.nom}`"
  class="team-image"
/>
    <h3 class="prenom">{{ v_app_team_data.prenom }}</h3>
    <h3 class="nom">{{ v_app_team_data.nom }}</h3>
  </a>
>>>>>>> Stashed changes
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
    v_app_team_data: CMS_API_people
}>()
</script>

<style scoped lang="scss">

.v-app-team {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  text-decoration: none;
  gap: var(--space-xs);
  width: 100%;
  max-width: 16rem;
  min-width: 12rem;


  img {
    width: 100%;
    max-width: 100%;
    height: auto;
    aspect-ratio: 3 / 4;
    object-fit: cover;
    border-radius: var(--radius-s);
  }

.team-image {
  width: 100%;
  max-width: 540px;
  min-width: 360px;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  border-radius: var(--radius-s);
}

<<<<<<< Updated upstream
<style lang="scss" scoped >
.v-app-team {
=======
  .prenom,
  .nom {
    transition: color 0.2s;
  }

  &:hover .prenom,
  &:hover .nom {
    color: var(--color-pink);
  }
>>>>>>> Stashed changes
}
</style>
