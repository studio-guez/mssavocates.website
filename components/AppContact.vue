<template>
    <section class="v-app-contact section bg-white rounded-l">
        <div class="v-app-contact__bloc">
            <!-- Colonne gauche -->
            <div class="v-app-contact__left">
                <h2>CONTACT</h2>
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
                    <div v-for="(m, i) in v_app_contact_data.membres" :key="i" class="v-app-contact__member">
                        <p class="v-app-contact__member-name">{{ m.nom }}</p>
                        <a class="v-app-contact__member-email" :href="`mailto:${m.email}`">{{ m.email }}</a>
                    </div>
                </div>
            </div>
            <!-- Colonne droite -->
            <div class="v-app-contact__right">
                <p class="v-app-contact__address">{{ v_app_contact_data.adresse }}</p>
                <img v-if="v_app_contact_data.image" :src="v_app_contact_data.image.reg.url"
                    :alt="v_app_contact_data.image.alt || 'Plan de l\'étude'" class="v-app-contact__image" />
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
.v-app-contact {
    padding: var(--space-l);
    display: flex;
    flex-direction: column;
    gap: var(--space-l);
}

.v-app-contact__bloc {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xl);
    justify-content: space-between;
    align-items: center; /* ✅ centre verticalement tous les enfants */
}

/* Colonne gauche */
.v-app-contact__left {
    flex: 1;
    min-width: 280px;
    max-width: 30vw;
    display: flex;
    flex-direction: column;
    gap: var(--space-s);
}

.v-app-contact__intro {
    font-size: var(--body-2-size);
    color: var(--color-black);
    margin-bottom: var(--space-s);
}

.v-app-contact__mss {
    font-weight: 300;
    font-size: 1.25rem;
    color: var(--color-black);
    margin-bottom: var(--space-m);
    margin-top: var(--space-m);
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
  margin: 0;
}

.v-app-contact__member-email {
  text-decoration: none;
  color: var(--color-black);
  font-weight: 400;
}

/* Colonne droite */
.v-app-contact__right {
    flex: 1;
    min-width: 20vw;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: var(--space-s);
    text-align: center;
    /* vertical-align: middle; */
}

.v-app-contact__address {
    font-size: var(--body-5-size);
    color: var(--color-text-muted);
    align-self: center;
}

.v-app-contact__image {
  max-width: 80%;
  height: auto;
  border-radius: var(--radius-m);
  display: block;
  margin-inline: auto; /* ✅ centre horizontalement */
  margin-top: var(--space-s);
  margin-bottom: var(--space-m);
}
</style>