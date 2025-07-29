<template>
  <section class="v-app-hero">
<div class="v-app-hero__grid">
  <!-- Texte : 4 colonnes -->
  <div class="v-app-hero__text">
    <div class="container">
      <div class="v-app-hero__text-inner">
        <h1 class="v-app-hero__title">
          {{ v_app_hero_data.titre }}
        </h1>
        <h3 class="v-app-hero__subtitle">
          {{ v_app_hero_data.texte }}
        </h3>
      </div>
    </div>
  </div>

 
 
      <!-- Articles : 2 colonnes -->
      <div class="v-app-hero__articles">
        <h3 class="v-app-hero__articles-title">DERNIEREMENT</h3>
 
 
        <AppHomeArticle
          v-for="article in articles"
          :key="article.slug"
          :v_app_article_data="article"
          variant="pink"
       />
      </div>
    </div>
  </section>
 </template>
 
 
 <script setup lang="ts">
 const props = defineProps<{
  v_app_hero_data: {
    titre: string
    texte: string
  }
  articles: CMS_API_Article[]
 }>()
 </script>
 
 
 <style scoped lang="scss">
 .v-app-hero {
  margin-block: var(--space-xl);
padding-right: var(--space-xl);
padding-left: var(--space-xl);
  &__grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: var(--space-xxl);
    align-items: start;
    justify-content: center;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }
 
 
  &__text {
    grid-column: span 4;
    align-self: center; // centré verticalement dans la grille
    display: flex;
    align-items: flex-start;
 
 
    @media (max-width: 900px) {
      grid-column: span 1;
    }
  }
 
 
   &__text-inner {

    display: flex;
    flex-direction: column;   // Centrage vertical dans le bloc
    align-items: flex-start;    // Alignement du texte à gauche
    text-align: left;
    width: 100%;
    height: 100%;
  }
 
 
  &__articles {
    grid-column: span 2;
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
    padding-left: var(--space-l);
    position: relative;
    width: 100%; // Important
    box-sizing: border-box; // Pour éviter que padding fasse déborder
 
 
    @media (max-width: 900px) {
      grid-column: span 1;
      padding-left: 0;
 
 
      &::before {
        display: none;
      }
    }
  }
 

  &__articles-title {
    font-family: var(--font-NewEdge);
    font-size: 1rem;
    font-weight: 400;
    text-align: center;
  }
 }
 
 </style>
 
 
 
 