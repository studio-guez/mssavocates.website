<template>
  <header class="v-header">

    <div class="v-header__top">
      <a href="/" class="v-header__logo">
        <img src="/public/img/mss_logo.svg" alt="Maulini Schneuwly Strummiello – Avocates" class="no-radius" />
      </a>

      <div class="v-header__menu" @click="toggleMenu">
        MENU
      </div>
    </div>

    <nav class="v-header__nav" :class="{ 'is-visible': showMenu }">
      <ul>
        <li><a href="#actualites">ACTUALITÉS</a></li>
        <li><a href="#equipe">ÉQUIPE</a></li>
        <li><a href="#domaines">DOMAINES D’ACTIVITÉS</a></li>
        <li><a href="#contact">CONTACT</a></li>
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
  width: 100%;
  background-color: white;
  box-sizing: border-box;

  .v-header__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }

  .v-header__logo {
    img {
      height: 3.5rem;
      display: block;
    }
  }

  .v-header__menu {

    cursor: pointer;
    user-select: none;
  }

  .v-header__nav {
    display: none;
    background-color: var(--color-pink);
    padding: 1.5rem 0;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: space-evenly;
      width: 100%;
      max-width: 1200px;
      margin-inline: auto;

      li {
        flex: 1;
        text-align: center;
      }

      li a {
        font-family: 'inter', sans-serif;
        font-weight: 600;
        color: white;
        text-decoration: none;
        font-size: 1.2rem;
        display: inline-block;
      }
    }

    &.is-visible {
      display: block;
    }
  }
}
</style>
