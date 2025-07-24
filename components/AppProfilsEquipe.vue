<template>
    <main v-if="currentProfil">
        <div class="v-profil__content">
            <div class="v-profil__image-column">
                <h3 class="v-profil__title">{{ currentProfil.fullname }}</h3>

                <div class="v-profil__image">
                    <img :src="currentProfil.photo.reg.url" :alt="currentProfil.photo.alt || currentProfil.fullname" />
                </div>
            </div>

            <div class="v-profil__description">
                <p v-html="currentProfil.description" />
                <p v-html="currentProfil.email" />

                <div class="v-profil__nav">
                    <AppButton variant="outlined" href="/">Accueil</AppButton>
                    <AppButton variant="outlined" @click="goToNextProfil">
                        Profil suivant
                    </AppButton>
                </div>
            </div>
        </div>
    </main>
</template>
  
  <script setup lang="ts">
  const props = defineProps<{
    profils: CMS_API_profils['profils_list']
  }>()
  
  const currentIndex = ref(0)
  const currentProfil = computed(() => props.profils[currentIndex.value])
  
  function goToNextProfil() {
    currentIndex.value =
      currentIndex.value < props.profils.length - 1 ? currentIndex.value + 1 : 0
  }
  </script>
  
  <style scoped>
  .v-profil__content {
    display: flex;
    flex-direction: row;
    gap: var(--space-xl);
  }
  
  .v-profil__image-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .v-profil__title {
    font-weight: 700;
    margin-bottom: var(--space-m);
    text-align: center;
  }
  
  .v-profil__image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--space-s);
}

.v-profil__image img {
  width: 100%;
  max-width: 400px; /* ✅ Augmentation de la taille max */
  border-radius: var(--radius-s);
  background-color: var(--color-light-grey);
  object-fit: fill;
}

  
  .v-profil__description {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-size: var(--text-body);
  color: var(--color-text);
  gap: var(--space-s); /* ✅ espace automatique entre <p> et les boutons */
   

  p {
    line-height: 1.6;
  }
}

.v-profil__description p + p {
  margin-top: var(--space-m); /* ou var(--space-m) si tu veux plus grand */
}



.v-profil__nav {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: var(--space-l);
  margin-top: var(--space-l);
  align-self: flex-end; /* 👉 pousse toute la ligne de boutons à droite de la colonne */
}

  </style>
  