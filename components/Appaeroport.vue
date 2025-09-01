<template>
  <section class="v-style-block">
    <section class="section">
      <div class="container v-aero__wrap">
        <h2 class="v-aero__title">
          À L’ATTENTION DU PERSONNEL DE GENÈVE AÉROPORT
        </h2>

        <div class="v-aero__intro">
          <p>
            Si vous estimez subir des désavantages professionnels en raison d’un
            signalement effectué pour la sauvegarde de l’intérêt général
            (lanceur.euse d’alerte), vous pouvez, à certaines conditions,
            bénéficier d’une protection spéciale. Les témoins d’irrégularités
            peuvent également être protégés. Dans ce cas, vous pouvez nous
            contacter sans passer par Genève Aéroport (service gratuit) :
            MAULINI, SCHNEUWLY &amp; STRUMMIELLO (Étude d’avocates)
          </p>
        </div>

        <!-- Coordonnées (recyclées du composant Contact) -->
        <div class="v-app-contact__mss v-aero__coords">
          <p>{{ v_app_contact_data.etude_nom }}</p>
          <p>{{ v_app_contact_data.etude_email }}</p>
          <p>{{ v_app_contact_data.etude_tel }}</p>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  v_app_contact_data: CMS_API_contact
}>()
</script>

<style scoped lang="scss">
/* Wrapper interne pour garder les mêmes marges/rythmes que le site */
.v-aero__wrap {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

/* Titre dans la même veine que tes h2 (tout en gardant le style global) */
.v-aero__title {
  text-transform: uppercase;
  line-height: 1.15;
}

/* Corps de texte proche du rendu Contact */
.v-aero__intro {
    max-width: 80ch; /* ✅ limite la largeur du texte */
  
  line-height: 1.8;
  color: var(--color-black);

  p + p { margin-top: var(--space-xl); }
}

/* Réutilise la typo/poids de Contact */
.v-aero__coords {
      margin-bottom: var(--space-xl);
  font-weight: 300;
  color: var(--color-black);
}

/* Petites respirations sur mobile */
@media (max-width: 900px) {
  .v-aero__wrap { gap: var(--space-l); }
}
</style>
