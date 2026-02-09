<template>
  <!-- Vue en mode preview : deux colonnes -->
  <StyleBlock
    v-if="isPreview"
    withDivider
    divider-position="center"
    :isShortDivider="true"
    :isFill="true"
  >
    <div class="v-app-article-wrapper">
      <div class="two-cols" :class="{ 'flex-row-reverse': reversed }">
        <!-- Colonne gauche : titre principal -->
        <div class="col">
          <div class="col-inner v-app-article__main text-center">
            <h2 class="v-app-article__main-title" v-html="v_app_article_data.main_title"/>
          </div>
        </div>

        <!-- Colonne droite : infos -->
        <div class="col">
          <div class="col-inner v-app-article__info">
            <p class="v-app-article__date">{{ v_app_article_data.date }}</p>
            <h4 class="v-app-article__title">{{ v_app_article_data.accroche }}</h4>
            <p class="v-app-article__resume" v-html="v_app_article_data.resume"/>
            <div class="v-app-article__actions">
              <AppButton
                :to="`/actualites/${v_app_article_data.slug}`"
                label="Lire"
                variant="outlined"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </StyleBlock>

  <!-- Vue complète (article entier) -->
  <section v-else class="section v-app-article__full">
    <div class="container">
      <p class="v-app-article__date">{{ v_app_article_data.date }}</p>
      <h2 v-html="v_app_article_data.main_title"/>
      <h4 v-html="v_app_article_data.accroche"/>
      <p v-html="v_app_article_data.resume"/>
      <div v-html="v_app_article_data.contenu"/>
    </div>
  </section>
</template>


<script setup lang="ts">
const props = defineProps<{
  v_app_article_data: CMS_API_Article
  isPreview?: boolean
  reversed?: boolean
}>()
</script>

<style scoped lang="scss">

.v-app-article-wrapper {
  width: 100%;
  max-width: min(100%, 1600px);
  margin-inline: auto;
  padding: var(--space-xxl) var(--space-xl);
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    * {
      color: var(--color-white);
    }
  }
}

@media (max-width: 900px) {
  .v-app-article-wrapper {
    padding: var(--space-xl) var(--space-m);
  }
}

.v-app-article__main-title {
  text-transform: uppercase;
  line-height: 1.2;
}

.v-app-article__info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;

  .v-app-article__actions {
    margin-top: auto;
    text-align: right;
  }
}

.flex-row-reverse .v-app-article__info .v-app-article__actions {
  text-align: left;
}

/* 📱 Mobile : bouton toujours à gauche */
@media (max-width: 900px) {
  .v-app-article__info .v-app-article__actions {
    margin-top: var(--space-l);
    text-align: left;
  }
}


.v-app-article__full {
  padding: var(--space-l);
  display: flex;
  flex-direction: column;
  gap: var(--space-m);
}

/* Système de colonnes pour les articles */
.v-app-article-wrapper .two-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xxxl);
  align-items: stretch;

  .col {
    min-width: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .col-inner {
    width: 100%;
    min-width: 0;
  }
}

/* desktop : on inverse pour reversed */
@media (min-width: 901px) {
  .v-app-article-wrapper .two-cols.flex-row-reverse {
    direction: rtl;
  }

  .v-app-article-wrapper .two-cols.flex-row-reverse .col {
    direction: ltr;
  }
}

/* mobile : on empile */
@media (max-width: 900px) {
  .v-app-article-wrapper .two-cols {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }

  .v-app-article-wrapper .two-cols.flex-row-reverse {
    direction: ltr;
  }
}

</style>
