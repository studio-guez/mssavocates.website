<template>
  <section class="v-app-article" :class="{ 'is-preview': isPreview, 'is-reversed': isPreview && reversed }">
    <!-- Mode preview avec layout alterné -->
    <div v-if="isPreview" class="v-app-article__preview">
      <div class="v-app-article__divider" />

      <!-- Colonne gauche ou droite : titre principal -->
      <div class="v-app-article__main">
        <h5 class="v-app-article__main-title" v-html="v_app_article_data.main_title"></h5>
      </div>

      <!-- Colonne opposée : infos -->
      <div class="v-app-article__info">
        <p class="v-app-article__date">{{ v_app_article_data.date }}</p>
        <div class="v-app-article__title" v-html="v_app_article_data.accroche"></div>
        <p class="v-app-article__resume" v-html="v_app_article_data.resume"></p>
        <div class="v-app-article__actions">
          <AppButton :to="`/actualites/${v_app_article_data.slug}`" label="Lire l’article" variant="outlined" />
        </div>
      </div>
    </div>


    <!-- Vue complète si pas en preview -->
    <div v-else class="v-app-article__full">
      <h3>{{ v_app_article_data.date }}</h3>
      <h3>{{ v_app_article_data.main_title }}</h3>
      <h3>{{ v_app_article_data.resume }}</h3>
      <div v-html="v_app_article_data.contenu" />
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

.v-app-article {
  position: relative;
  background-color: var(--color-white);
  border-radius: var(--radius-l);
  padding: var(--space-xl) var(--space-xl) var(--space-xxl);
  border: 2px solid var(--color-pink);
  margin-bottom: var(--space-xxs);
  overflow: hidden;
  box-sizing: border-box;
}

.v-app-article__preview {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: var(--space-xl);
  position: relative;
  flex-wrap: wrap;
}

.v-app-article__divider {
  position: absolute;
  top: var(--space-xxs);       // 🔁 réduis ces valeurs
  bottom: var(--space-xxs);    // 🔁 ou remplace-les par 0
  left: 50%;
  width: 1px;
  background-color: var(--color-pink);
  transform: translateX(-50%);
  z-index: 0;
  pointer-events: none;
}


.v-app-article__main,
.v-app-article__info {
  flex: 1;
  z-index: 1;
}

.v-app-article__main {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  .v-app-article__main-title {
    font-size: 2.75rem;
    font-weight: 700;
    text-transform: uppercase;
  }
}

.v-app-article__info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--space-m);

  .v-app-article__date {
    font-weight: 500;
    font-size: var(--text-small);
    color: var(--color-text-muted);
  }

  .v-app-article__title::v-deep(p) {
  font-weight: 800;
  text-transform: uppercase;
}


  .v-app-article__resume {
    font-size: var(--body-2-size);
    line-height: 1.5;
  }
}

.v-app-article.is-reversed .v-app-article__preview {
  flex-direction: row-reverse;
}

.v-app-article__actions {
  align-self: flex-end;
  margin-top: auto;
  flex-shrink: 0;

  :deep(button),
  :deep(a) {
    font-size: var(--text-small);
    padding: 0.5rem 1.25rem;
  }
}

</style>
