<template>
  <main>
    <div class="two-cols container">
      <!-- Colonne gauche : image -->
      <div class="col">
        <div class="col-inner v-profil__image-column">
          <h3 class="v-profil__title">{{ profil.title }}</h3>

          <div class="v-profil__image">
            <img
              :src="profil.photo?.reg.url"
              :alt="profil.photo?.alt || profil.title"
            />
          </div>
        </div>
      </div>

      <!-- Colonne droite : description + actions -->
      <div class="col">
        <div class="col-inner v-profil__description">
          <div>
            <div v-html="profil.description" />
            <p v-if="profil.email"
               style="margin-top: var(--space-m)" v-html="profil.email"
            />
            <a
              v-if="profil.cv_file"
              :to="profil.cv_file"
              target="_blank"
              class="cv-button"
              style="margin-top: var(--space-m); display: inline-block;"
            >Curriculum Vitae</a>
          </div>

          <div class="v-profil__nav">
            <AppButton variant="outlined" to="/#equipe">Équipe</AppButton>
            <AppButton v-if="next_slug_profil"
                       :to="next_slug_profil"
                       variant="outlined"
            >
              Profil suivant
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


  <script setup lang="ts">
  defineProps<{
    profil: CMS_API_profil
    next_slug_profil: string | null
  }>()
  </script>

  <style scoped>
.v-profil__image-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-m);
}

.v-profil__title {
  font-weight: 700;
  text-align: center;
  margin: 0;
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
  max-width: 400px;
  border-radius: var(--radius-s);
  object-fit: fill;
}

.v-profil__description {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: var(--space-l);
  height: 100%; /* nécessaire pour que margin-top: auto fonctionne */
}

:global(.v-profil__description p) {
  line-height: 1.6;
}

:global(.v-profil__description p + p) {
  margin-top: var(--space-m);
}

.v-profil__nav {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: auto; /* ✅ pousse le bloc tout en bas */
}

</style>
