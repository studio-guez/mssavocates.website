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
        <li><a href="#equipe">ÉQUIPE</a></li>
        <li><a href="#domaines">DOMAINES D’ACTIVITÉS</a></li>
       
        <li><a href="/contact">CONTACT</a></li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showMenu = ref(false)
function toggleMenu() {
  showMenu.value = !showMenu.value
}
</script>

<style scoped lang="scss">
.v-header {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  z-index: 99;

  .v-header__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
     background-color: var(--color-white);;
    //border: 2px solid var(--color-pink);
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
      border: var(--border) solid var(--color-white);
    transform: translateY(-100%);
    transition: transform 0.3s ease-in-out;
    z-index: 10;

    ul {
      list-style: none;
      margin: 0;
      padding: var(--space-l) 0;
      display: flex;
      justify-content: space-between;
      max-width: 1000px;
      margin-inline: auto;
      gap: 2rem;

      li {
   flex: 1;
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
}
</style>
