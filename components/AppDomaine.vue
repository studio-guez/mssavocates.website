<template>
  <section class="v-style-block is-fill">
    <div class="container">
      <h2 class="v-app-domaine__titre light">DOMAINES D’ACTIVITÉS</h2>
    </div>

    <div class="two-cols container">
      <div class="col">
        <div class="col-inner v-app-domaine__text">
          <div
            v-for="domaine in v_app_domaine_data.domaines"
            :key="domaine.titre"
            class="v-app-domaine__bloc"
          >
            <h4>{{ domaine.titre }}</h4>
            <div v-html="domaine.description" />
          </div>
        </div>
      </div>

   <div class="col">
  <div class="col-inner v-app-domaine__media" v-if="v_app_domaine_data.image && v_app_domaine_data.image.reg">
    <img :src="v_app_domaine_data.image.reg.url" alt="" class="domaine-image" />
  </div>
</div>
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

.v-app-domaine__titre {
  margin-bottom: var(--space-xl);
}

.v-app-domaine__text {
  display: flex;
  flex-direction: column;
  gap: var(--space-l);
}

.v-app-domaine__bloc {
  display: flex;
  flex-direction: column;
  gap: var(--space-m);
  margin-bottom: var(--space-l);
}

.v-app-domaine__bloc h4 {
  color: var(--color-pink);
}

.v-app-domaine__media {
  display: flex;
  justify-content: center;
  align-items: center;
}

.domaine-image {
  width: 100%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  border-radius: var(--radius-s);
}


</style>
