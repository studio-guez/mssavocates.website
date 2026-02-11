<template>
  <section class="section app-footer" v-if="v_app_footer_data">
    <div class="container">
      <div class="footer-container">
        <div class="footer-block">
          <h4>Adresse</h4>
          <div class="body-2" v-html="v_app_footer_data.adresse" />
        </div>

        <div class="footer-block">
          <h4>Accès</h4>
          <div class="body-2" v-html="v_app_footer_data.acces" />
        </div>

        <div class="footer-block">
          <h4>Contact</h4>
          <div class="body-2" v-html="v_app_footer_data.contact" />
        </div>

        <div class="footer-block">
          <h4>Accueil téléphonique</h4>
          <div class="body-2" v-html="v_app_footer_data.accueil" />
        </div>

        <div class="footer-block footer-block--button">
          <AppButton to="/geneve-aeroport" variant="outlined-black">
            À l'attention du personnel<br>de Genève Aéroport
          </AppButton>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  v_app_footer_data: CMS_API_Footer
}>()
</script>

<style scoped lang="scss">


.app-footer {
  background-color: var(--color-white);
  border-radius: var(--radius-l) var(--radius-l) 0 0;
  /* ✅ padding vertical/marges gérés par .section + .container (main.css) */
}

/* Grille interne */
.footer-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--space-l);
}

:global(.footer-container h4) {
  font-size: 1rem;
}

:global(.footer-container p) {
  font-size: .8rem;
}

/* Blocs */
.footer-block h4 {
  margin-bottom: var(--space-m);
}

.footer-block--button {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

/* Responsive */
@media (max-width: 899px) {
  .footer-block--button {
    justify-content: flex-start;
  }
}


@media (min-width: 1200px) {
  .footer-container {
    gap: var(--space-xl);
  }
}
</style>

