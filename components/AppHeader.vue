<template>
  <header class="v-header">
    <div class="v-header__top">
      <a href="/" class="v-header__logo">
        <img src="/public/img/mss_logo.svg" alt="Maulini Schneuwly Strummiello – Avocates" class="no-radius" />
      </a>

      <div class="v-header__menu" @click="toggleMenu">MENU</div>
    </div>

    <nav class="v-header__nav" :class="{ 'is-visible': showMenu }">
      <ul>
        <li><a href="/actualites">ACTUALITÉS</a></li>
        <li><NuxtLink href="/#equipe">ÉQUIPE</NuxtLink></li>
        <li><a href="/#domaines">NOTRE ÉTUDE</a></li>
        <li><a href="/contact">CONTACT</a></li>
      </ul>
      <AppButton to="/geneve-aeroport" variant="outlined-white" class="v-header__btn">
        À l'attention du personnel<br>de Genève Aéroport
      </AppButton>
    </nav>

  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'

const showMenu = ref(false)
// const isHeaderHidden = ref(false)
// let lastScrollY = 0

function toggleMenu() { showMenu.value = !showMenu.value }
function closeMenu()  { showMenu.value = false }

function onScroll() {
  const currentScrollY = window.scrollY

  if (showMenu.value && currentScrollY > 4) {
    closeMenu()
  }

  // 👇 Comportement de masquage du header au scroll (commenté)
  // Cache le header si on scroll vers le bas, montre si on scroll vers le haut
  // if (currentScrollY > lastScrollY && currentScrollY > 100) {
  //   isHeaderHidden.value = true
  // } else {
  //   isHeaderHidden.value = false
  // }
  // lastScrollY = currentScrollY
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

const route = useRoute()
watch(() => route.fullPath, () => closeMenu())
</script>

<style scoped lang="scss">
.v-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  z-index: 99;
  transition: transform 0.3s ease;

  &.is-hidden {
    transform: translateY(-100%);
  }

  .v-header__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: var(--color-white);
    border-bottom: var(--border-width) solid var(--color-pink);
    position: relative;
    z-index: 999; // toujours au-dessus du menu
  }

  .v-header__logo img {
    height: 3.5rem;
    display: block;
  }

  .v-header__menu {
    cursor: pointer;
    user-select: none;
    z-index: 11;
  }

  .v-header__nav {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: var(--color-pink);
    border: var(--border-width) solid var(--color-white);
    transform: translateY(-100%);
    transition: transform 0.3s ease-in-out;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: var(--space-l);
    gap: 3rem;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      gap: 3rem;

      li {
        flex: none;
        display: flex;
        justify-content: center;
        align-items: center;
      }

a {
  font-family: var(--font-NewEdge);
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.2;
  color: var(--color-white);
  text-decoration: none;
  display: block;
  max-width: 7rem;
  text-align: center;
  white-space: normal; 
}
    }

    &.is-visible {
      transform: translateY(0%);
    }
  }

  .v-header__btn {
    font-family: var(--font-NewEdge);
    font-size: 0.9rem;
    line-height: 1.3;
    white-space: normal;
    padding: 0.75rem 2rem !important;
    border-radius: 1.25rem !important;
    min-width: 220px;
  }
}

/* === Mobile uniquement : empiler les liens === */
@media (max-width: 899px) {
  .v-header__nav ul {
    /* passe en colonne */
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;

    /* occupe toute la largeur (sinon le max-width:1000px recentre et limite) */
    max-width: none;
    margin-inline: 0;

    /* padding un peu réduit pour le panneau mobile (garde l’aspect) */
    padding: var(--space-m);
    gap: var(--space-s);
  }

  .v-header__nav li {
    flex: none;           /* on n’étire pas les items */
    display: block;
  }

  .v-header__nav a {
    display: block;
    width: 100%;          /* lien prend toute la ligne */
    max-width: none;      /* on supprime la limite 7rem du desktop */
    text-align: center;   /* garde l’alignement actuel */
    /* pas de bordure / pas d’arrondi : on ne change pas l’aspect visuel */
    padding: 0;           /* on ne rajoute pas de padding pour rester fidèle */
    white-space: normal;
  }
}


</style>
