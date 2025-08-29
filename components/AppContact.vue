<template>

      <section class="v-style-block is-fill">
    <div class="container">
      <h2 class="v-app-domaine__titre light">CONTACT</h2>
    </div>

    <div class="two-cols container">
      <!-- Colonne gauche -->
      <div class="col">
        <div class="col-inner v-app-contact__left">
          <!-- Introduction -->
          <div v-if="v_app_contact_data.intro" class="v-app-contact__intro" v-html="v_app_contact_data.intro" />

          <!-- Bloc MSS -->
          <div class="v-app-contact__mss">
            <p>{{ v_app_contact_data.etude_nom }}</p>
            <p>{{ v_app_contact_data.etude_email }}</p>
            <p>{{ v_app_contact_data.etude_tel }}</p>
          </div>

          <!-- Membres -->
          <div class="v-app-contact__members">
            <div
              v-for="(m, i) in v_app_contact_data.membres"
              :key="i"
              class="v-app-contact__member"
            >
              <p class="v-app-contact__member-name">{{ m.nom }}</p>
              <a class="v-app-contact__member-email" :href="`mailto:${m.email}`">{{ m.email }}</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Colonne droite -->
      <div class="col">
        <div class="col-inner v-app-contact__right">
          <p class="v-app-contact__address">{{ v_app_contact_data.adresse }}</p>
        <img v-if="v_app_contact_data.image" :src="v_app_contact_data.image.reg.url"
                    :alt="v_app_contact_data.image.alt || 'Plan de l\'étude'" class="v-app-contact__image" />
        </div>
      </div>
    </div>
  </section>
</template>


<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
    v_app_contact_data: CMS_API_contact
}>()
</script>

<style scoped>

.v-app-domaine__titre.light {
  margin-bottom: 0rem;
}

.v-app-contact__left {
  display: flex;
  flex-direction: column;
  gap: var(--space-l);
  text-align: left;
}

.v-app-contact__intro {
  font-size: var(--body-2-size);
  color: var(--color-black);
}

.v-app-contact__mss {
  font-weight: 300;
  font-size: 1.25rem;
  color: var(--color-black);
}

.v-app-contact__members {
  display: flex;
  flex-direction: column;
  gap: var(--space-m);
}

.v-app-contact__member {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.v-app-contact__member-name {
  font-weight: 400;
}

.v-app-contact__member-email {
  text-decoration: none;
  color: var(--color-black);
  font-weight: 400;
}

.v-app-contact__right {
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* ✅ aligne tout en haut */
  align-items: center;
  gap: var(--space-s);
  text-align: center;
  height: 100%;
}

.v-app-contact__address {
  margin-top: 0; /* ✅ pas de marge au-dessus en desktop */
  font-size: var(--body-2-size);
  color: var(--color-black);

  /* ✅ si tu veux un petit espace en mobile seulement */
  @media (max-width: 900px) {
    margin-top: var(--space-m);
  }
}

.v-app-contact__image {
  width: 100%;
  max-width: 100%;
  border-radius: var(--radius-s);
  margin-top: var(--space-s); /* desktop = petit espace */
}

</style>