<template>
    <section class="v-dispostifdeprotection"
    >
      <div class="v-dispostifdeprotection__content">
        <div style="margin-bottom: 1rem">MAULINI, SCHNEUWLY & STRUMMIELLO Avocates</div>
        <h1>A l’attention du personnel de Genève&nbsp;Aéroport </h1>
        <p>
          Si vous estimez subir des désavantages professionnels en raison d’un signalement effectué pour la sauvegarde de l’intérêt général (lanceur.euse d’alerte), vous pouvez, à certaines conditions, bénéficier d’une protection&nbsp;spéciale.
          <br>Les témoins d’irrégularités peuvent également être protégés.
        </p>
        <p>Dans ce cas, vous pouvez nous contacter sans passer par Genève Aéroport (service gratuit) : MAULINI, SCHNEUWLY & STRUMMIELLO (Étude d’avocates)</p>

        <p>
          +41 22 337 02 20
          <br>info@mssavocates.ch
          <br>mssavocates.ch
        </p>

      </div>

      <div class="v-dispostifdeprotection__bottom">
        <div class="v-dispostifdeprotection__bottom__address">
          Rue du Conseil-Général, 14
          <br>1205 Geneve
        </div>

        <div class="v-dispostifdeprotection__bottom__contact">
          <NuxtLink href="/"
                    class="v-dispostifdeprotection__back app-button"
          >
            Accueil
          </NuxtLink>
        </div>
      </div>
    </section>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
    message?: string
}>()
</script>





<style lang="scss" scoped >
.v-dispostifdeprotection__content {
  box-sizing: border-box;
  padding: 1rem;

  h1 {
    margin-top: 0;
    max-width: 12em;
  }

  max-width: 35rem;
}

.v-dispostifdeprotection__bottom {
  box-sizing: border-box;
  padding: 0 1rem 1rem;

  @media (min-width: 1100px) {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 10;
  }
}

.v-dispostifdeprotection__bottom__contact {
  margin-top: 1rem;

  @media (min-width: 1100px) {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    margin: 0;
    text-align: right;
  }
}
</style>
