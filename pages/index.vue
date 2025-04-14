<template>
  <main class="v-index"
  >
    <div class="v-index__top">
      <div class="v-index__top__info">
        Site en construction
      </div>

      <div class="v-index__top__description">
        L’Étude ouvrira ses portes le 1<sup>er</sup> mai 2025.
        <br>Nous nous réjouissons de vous accueillir.
      </div>
    </div>

    <div class="v-index__content">
      <div class="v-index__content__names">
        MAULINI,
        <br>SCHNEUWLY
        <br>& STRUMMIELLO
        <br>Avocates
      </div>
    </div>

    <div class="v-index__bottom">
      <div class="v-index__bottom__contact">
        <div>
          <div class="v-index__bottom__contact__header">Adresse générale</div>
          <a href="mailto:info@mssavocates.ch">info@mssavocates.ch</a>
        </div>

        <div>
          <div class="v-index__bottom__contact__header">Me Camille MAULINI</div>
          <a href="mailto:maulini@mssavocates.ch">maulini@mssavocates.ch</a>
        </div>

        <div>
          <div class="v-index__bottom__contact__header">Me Clara SCHNEUWLY</div>
          <a href="mailto:schneuwly@mssavocates.ch">schneuwly@mssavocates.ch</a>
        </div>

        <div>
          <div class="v-index__bottom__contact__header">Me Sara STRUMMIELLO</div>
          <a href="mailto:strummiello@mssavocates.ch">strummiello@mssavocates.ch</a>
        </div>
      </div>

      <div class="v-index__bottom__address">
        <a href="tel:+41223370220">+41 22 337 02 20</a>
        <br>Rue du Conseil-Général, 14
        <br>1205 Geneve
      </div>
    </div>



  </main>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
    message?: string
}>()
</script>





<style lang="scss" scoped >
.v-index {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.v-index__top {
  box-sizing: border-box;
  padding: 1rem;

  @media (min-width: 1100px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;

  }
}

.v-index__top__info {
  font-weight: 700;
  margin-bottom: 1rem;
}

.v-index__top__description {
  margin-bottom: 1rem;

  @media (min-width: 1100px) {
    position: absolute;
    top: 1rem;
    right: 1rem;
    margin: 0;
    text-align: right;
  }
}



.v-index__content {
  box-sizing: border-box;
  padding: 1rem;

  @media (min-width: 1100px) {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
}

.v-index__content__names {
  font-size: 2.5rem;
  line-height: 1em;
  font-weight: 600;

  @media (min-width: 1100px) {
    text-align: center;
  }
}


.v-index__bottom {
  box-sizing: border-box;
  padding: 1rem;

  @media (min-width: 1100px) {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 10;
  }
}

.v-index__bottom__contact {
  margin-bottom: 1rem;

  @media (min-width: 1100px) {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    margin: 0;
    text-align: right;
  }
}

.v-index__bottom__contact__header {
  font-weight: 700;
  margin-top: 1rem;
}
</style>
