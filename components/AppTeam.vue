<template>
  
  <a href="/equipe" class="v-app-team-card">
    <img
      :src="v_app_team_data.image.reg.url"
      :alt="`${v_app_team_data.prenom} ${v_app_team_data.nom}`"
      class="team-image"
    />
    <div class="identite">
      <h2 class="prenom">{{ v_app_team_data.prenom }}</h2>
      <h2 class="nom">{{ v_app_team_data.nom }}</h2>
    </div>
  </a>
</template>
 
 
 <script setup lang="ts">
 import { defineProps } from 'vue'
 
 
 const props = defineProps<{
    v_app_team_data: CMS_API_people
 }>()
 </script>
 
 <style scoped lang="scss">
.v-app-team-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  text-decoration: none;
  gap: var(--space-xl);
  width: 100%;
  max-width: 340px;                /* limite desktop */
  transition: transform 0.2s;
  padding-bottom: var(--space-xl);
  margin-inline: auto;             /* centre la carte dans sa colonne */

  .team-image {
    width: 100%;
    aspect-ratio: 2 / 3;
    object-fit: cover;
    border-radius: var(--radius-s);
    display: block;
  }

  .identite {
    display: flex;
    flex-direction: column;
    line-height: 1;
    gap: 0;                        /* prénom et nom collés */
  }

  .prenom,
  .nom {
    margin: 0;
    font-size: 2rem;
    line-height: 1;
    font-family: var(--font-NewEdge);
    font-weight: 600;
    color: var(--color-black);
  }

  &:hover .prenom,
  &:hover .nom {
    color: var(--color-pink);
  }
}

/* --- Responsive mobile --- */
@media (max-width: 900px) {
  .v-app-team-card {
    max-width: 100%;                   /* prend toute la largeur dispo */
    margin-inline: var(--space-s);     /* mêmes marges que .container */
    gap: var(--space-l);
    padding-bottom: var(--space-l);
  }

  .v-app-team-card .prenom,
  .v-app-team-card .nom {
    //font-size: 1rem;                 /* adapte la taille sur mobile */
  }
}
</style>

 