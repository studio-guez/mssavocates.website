  <template>
    <!-- Vue en mode preview : deux colonnes -->
  <StyleBlock
    v-if="isPreview"
    withDivider
    divider-position="center"
    :isShortDivider="true"
    class="v-style-block is-fill"
  >
    <div class="two-cols container" :class="{ 'flex-row-reverse': reversed }">
      <!-- Colonne gauche : titre principal -->
      <div class="col">
        <div class="col-inner v-app-article__main text-center">
          <h2 class="v-app-article__main-title" v-html="v_app_article_data.main_title" />
        </div>
      </div>

      <!-- Colonne droite : infos -->
      <div class="col">
        <div class="col-inner v-app-article__info">
          <p class="v-app-article__date">{{ v_app_article_data.date }}</p>
          <h4 class="v-app-article__title">{{ v_app_article_data.accroche }}</h4>
          <p class="v-app-article__resume" v-html="v_app_article_data.resume" />
          <div class="v-app-article__actions">
            <AppButton
              :to="`/actualites/${v_app_article_data.slug}`"
              label="Lire l’article"
              variant="outlined"
            />
          </div>
        </div>
      </div>
    </div>
  </StyleBlock>


    <!-- Vue complète (article entier) -->
    <section v-else class="v-app-article__full">
      <p class="v-app-article__date">{{ v_app_article_data.date }}</p>
      <h2 v-html="v_app_article_data.main_title" />
      <h4 v-html="v_app_article_data.accroche" />
      <p v-html="v_app_article_data.resume" />
      <div v-html="v_app_article_data.contenu" />
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


  .v-app-article__full {
    padding: var(--space-l);
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
  }

  .flex-row-reverse {
  flex-direction: row-reverse;
}

    </style>
