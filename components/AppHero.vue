<template>
<section class="v-app-hero">
  <div class="container">
    <div class="v-app-hero__grid">
      <div class="v-app-hero__text">
        <div class="v-app-hero__text-inner">
          <h1 class="v-app-hero__title">{{ v_app_hero_data.titre }}</h1>
          <h3 class="v-app-hero__subtitle">{{ v_app_hero_data.texte }}</h3>
        </div>
      </div>

      <div class="v-app-hero__articles">
        <h3 class="v-app-hero__articles-title">DERNIÈREMENT</h3>
        <AppHomeArticle
          v-for="a in articles"
          :key="a.slug"
          :v_app_article_data="a"
          variant="pink"
        />
      </div>
    </div>
  </div>
</section>


 </template>


 <script setup lang="ts">
 const props = defineProps<{
  v_app_hero_data: {
    titre?: string
    texte?: string
  }
  articles: CMS_API_Article[]
 }>()
 </script>

 <style scoped lang="scss">
.v-app-hero {
  margin-block: var(--space-l);
  padding: 0; /* padding géré par le container */

  /* 1) Hero : container pleine largeur pour aligner avec le divider */
  > .container {
    max-width: 2500px;
    padding-inline: var(--space-l);
    box-sizing: border-box;
  }

  &__grid {
    /* 2) Grille 6 colonnes comme le divider (leftSplit = 4/6 | 2/6) */
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: var(--space-xl);
    align-items: start;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
      gap: var(--space-l);
    }
  }

  /* 3) Texte à gauche = colonnes 1..4  */
  &__text {
    grid-column: 1 / 5;
    align-self: center;
    display: flex;
    align-items: flex-start;

    @media (max-width: 900px) {
      grid-column: 1 / -1;
    }
  }

  &__text-inner {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    width: 100%;
    height: 100%;

    /* on garde un confort de lecture */
    max-width: 80ch;

    @media (min-width: 901px) {
      padding-right: var(--space-xxl);
    }
  }

  /* 4) Articles à droite = colonnes 5..6  */
  &__articles {
    grid-column: 5 / 7;
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
    position: relative;
    z-index: 2;
    min-width: 0;
    justify-content: center;

    /* petit recul visuel par rapport à la ligne */
    padding-left: var(--space-l);

    @media (max-width: 900px) {
      grid-column: 1 / -1;
      padding-left: 0;
    }
  }

  &__articles-title {
    font-family: var(--font-NewEdge);
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
  }

  /* Sécurité mobile */
  @media (max-width: 900px) {
    padding: 0;

    &__text-inner {
      padding-right: 0;
      max-width: 100%;
      overflow-wrap: anywhere;
    }
  }
}


</style>




