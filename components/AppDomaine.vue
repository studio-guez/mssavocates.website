<template>
  <section class="v-app-domaine">
    <div class="v-app-domaine__text">
      <!-- <h2>Domaines d’activités</h2> -->
      <div
        v-for="domaine in v_app_domaine_data.domaines"
        :key="domaine.titre"
        class="v-app-domaine__bloc"
      >
        <h4 v-html="domaine.titre" />
        <div v-html="domaine.description" />
      </div>
    </div>

    <div class="v-app-domaine__media">
      <img :src="v_app_domaine_data.image.reg.url" alt="" />
    </div>
  </section>
</template>

  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  
  const props = defineProps<{
    v_app_domaine_data: CMS_API_domaines_activite
  }>()
  </script>
  
  <style scoped>
  </style>

<style scoped>
.v-app-domaine {
  display: flex;
  justify-content: space-between;
  gap: var(--space-xl);
  align-items: flex-start;
  padding-inline: var(--space-m);
}
.v-app-domaine__bloc h4 {
  color: var(--color-pink);
}

/* Colonne gauche */
.v-app-domaine__text {
  flex: 1;
  max-width: 50vw;
  display: flex;
  flex-direction: column;
  gap: var(--space-s);
}

.v-app-domaine__bloc {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  margin-bottom: var(--space-m); /* 👈 ajoute cette ligne */
}

/* Contenu injecté */
.v-app-domaine__desc :deep(p),
.v-app-domaine__desc :deep(ul),
.v-app-domaine__desc :deep(li) {
  margin: 0 0 var(--space-xs) 0;
  padding: 0;
  color: var(--color-black);
  line-height: 1.6;
}
/* Colonne droite */
.v-app-domaine__media {
  flex: 1;
  padding: var(--space-xs);
  min-height: 600px;
}
</style>