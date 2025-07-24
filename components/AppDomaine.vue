<template>
  <h2 class="v-app-domaine__titre">DOMAINES D'ACTIVITÉS</h2>
  <section class="v-app-domaine">
<<<<<<< Updated upstream
    <div v-for="domaine in v_app_domaine_data.domaines">
      <h3 v-html="domaine.titre"></h3>
      <div v-html="domaine.description"></div>
=======
    <div class="v-app-domaine__text">
      <!-- <h2>Domaines d’activités</h2> -->
      <div v-for="domaine in v_app_domaine_data.domaines" :key="domaine.titre" class="v-app-domaine__bloc">
        <h4 v-html="domaine.titre" />
        <div v-html="domaine.description" />
      </div>
    </div>

    <div class="v-app-domaine__media">
      <img :src="v_app_domaine_data.image.reg.url" alt="" />
>>>>>>> Stashed changes
    </div>
    <img :src="v_app_domaine_data.image.reg.url" />
  </section>
</template>
<<<<<<< Updated upstream
  
  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  
  const props = defineProps<{
    v_app_domaine_data: CMS_API_domaines_activite
  }>()
  </script>
  
  
  
  
  
  <style lang="scss" scoped >

  </style>
  
=======


<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  v_app_domaine_data: CMS_API_domaines_activite
}>()
</script>

<style scoped></style>

<style scoped>
.v-app-domaine__titre {
  margin-bottom: var(--space-xs);
}

.v-app-domaine {
  display: flex;
  justify-content: space-between;
  gap: var(--space-xl);
  /* align-items: flex-start; */
  padding-inline: var(--space-m);
  align-items: center;

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
  gap: var(--space-m);
}

.v-app-domaine__bloc {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  margin-bottom: var(--space-xs);
  /* 👈 ajoute cette ligne */
}

/* Contenu injecté */
.v-app-domaine__desc :deep(p),
.v-app-domaine__desc :deep(ul),
.v-app-domaine__desc :deep(li) {
  margin: 0 0 var(--space-l) 0;
  padding: 0;
  color: var(--color-black);
  line-height: 1.6;
}

/* Colonne droite */
.v-app-domaine__media {
  flex: 1;
  padding: var(--space-xs);
  min-height: 70vh;
}
</style>
>>>>>>> Stashed changes
