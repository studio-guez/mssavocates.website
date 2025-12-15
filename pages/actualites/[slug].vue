<template>
  <StyleBlock :withDivider="true" dividerPosition="center" :isShortDivider="true">
    <main class="v-article-detail">
      <template v-if="data">
        <template v-if="data.status === 'ok' && article">
          <div class="two-cols container">
            <!-- Colonne gauche : titre -->
            <div class="col">
              <div class="col-inner v-article-detail__left">
                <h2 class="main-title">{{ article?.main_title }}</h2>
              </div>
            </div>

            <!-- Colonne droite : contenu + bouton -->
            <div class="col">
              <div class="col-inner v-article-detail__right">
                <div class="v-article-detail__right-content">
                  <p class="article-date">{{ article?.date }}</p>
                  <p class="article-accroche"><strong>{{ article?.accroche }}</strong></p>
                  <KirbyBlocks :blocks="article?.contenu" :files="article?.files" class="article-body" />
                </div>

                <div class="v-article-detail__footer">
                  <AppButton to="/actualites" variant="outlined">Tous les articles</AppButton>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <AppError />
        </template>
      </template>
    </main>
  </StyleBlock>
</template>



<script setup lang="ts">

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data, status, error } = await useFetch<CMS_API_Response & { result: CMS_API_Article }>('/api/CMS_KQLRequest', {
  lazy: true,
  method: 'POST',
  body: {
    query: `site.find("actualites").children.find("${slug.value}")`,
    select: {
      main_title: true,
      accroche: true,
      date: true,
      resume: true,
      contenu: 'page.contenu.toBlocks',
      slug: true,
      files: {
        query: 'page.files',
        select: {
          id: true,
          uuid: true,
          url: true,
          filename: true,
          name: true
        }
      }
    }
  }
})

const article = computed(() => data.value?.result ?? null)

// Signal que les données initiales sont chargées
const { setInitialDataLoaded } = useAppLoading()
watch(() => data.value, (newData) => {
  if ( newData ) {
    setInitialDataLoaded()
  }
}, { immediate: true })


</script>


<style scoped lang="scss">
/* Grille responsive sans @media : 1–2 colonnes selon la largeur */
.two-cols {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); /* s'empile tout seul sous 640px */
  gap: var(--space-xxl);
  margin-block: var(--space-l);
  margin-bottom: var(--space-xxl);
}

.two-cols .col {
  /* plus de min-width rigide */
  min-width: 0;         /* clé anti-overflow pour le contenu flex/grid */
}

.two-cols .col .col-inner {
  width: 100%;
  display: flex;
  flex-direction: column;
  min-width: 0;         /* évite que le contenu pousse la colonne */
}

/* Titre gauche */
.v-article-detail__left .main-title {
  text-transform: uppercase;
  line-height: 1.2;
}

/* Colonne droite */
.v-article-detail__right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 100%;

  .v-article-detail__right-content {
    flex-grow: 1;
  }

  .v-article-detail__footer {
    align-self: flex-end;
    margin-top: var(--space-xxl);
  }
}

/* Contenu article (sécurité overflow) */
.v-article-detail__right-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-m);

  .article-date {
    font-size: 0.9rem;
    color: #999;
  }

  .article-accroche {
    font-size: 1.1rem;
    font-weight: 600;
  }

  .article-body {
    font-size: 1rem;
    line-height: 1.7;
    color: #333;
    overflow-wrap: anywhere;  /* évite qu’un mot/URL casse la mise en page */

    p { margin-bottom: 1rem; }
    img { max-width: 100%; height: auto; display: block; } /* images contenues */
  }
}

/* Vue complète (inchangée) */
.v-article-detail__full {
  padding: var(--space-l);
  display: flex;
  flex-direction: column;
  gap: var(--space-m);
}
</style>


