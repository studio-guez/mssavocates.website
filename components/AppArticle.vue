<template>
  <!-- Vue en mode preview : deux colonnes -->
  <StyleBlock
    v-if="isPreview"
    withDivider
    divider-position="center"
    :isShortDivider="true"
    class="v-style-block is-fill"
  >
    <!-- ✅ Ajout d’une section + container à l’intérieur -->
    <section class="section">
      <div class="container">
        <div class="two-cols" :class="{ 'flex-row-reverse': reversed }">
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
                  label="Lire"
                  variant="outlined"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </StyleBlock>

  <!-- Vue complète (article entier) -->
  <section v-else class="section v-app-article__full">
    <div class="container">
      <p class="v-app-article__date">{{ v_app_article_data.date }}</p>
      <h2 v-html="v_app_article_data.main_title" />
      <h4 v-html="v_app_article_data.accroche" />
      <p v-html="v_app_article_data.resume" />
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

  .flex-row-reverse {
  flex-direction: row-reverse;
}

/* remet en flex quand on veut inverser */
.two-cols.flex-row-reverse {
  display: flex;               /* ← override le grid global */
}

/* desktop : on inverse */
@media (min-width: 901px) {
  .two-cols.flex-row-reverse {
    flex-direction: row-reverse;
    gap: var(--space-xxxl);
  }
}

/* mobile : on empile (pas de reverse sur mobile) */
@media (max-width: 900px) {
  .two-cols.flex-row-reverse {
    flex-direction: column;
    gap: var(--space-l);
  }
}

/* sécurité anti-débordement */
.two-cols .col { min-width: 0; }

    </style>
