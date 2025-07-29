<template>
  <StyleBlock :withDivider="true" dividerPosition="center" :isShortDivider="true">
    <main class="v-article-detail">
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
              <div class="article-body" v-html="article?.contenu" />
            </div>

            <div class="v-article-detail__footer">
              <AppButton to="/actualites" variant="outlined">Retour</AppButton>
            </div>
          </div>
        </div>
      </div>
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
      contenu: true,
      slug: true
    }
  }
})

console.log("Slug:", slug)
console.log("KQL data:", data.value)
console.log("KQL status:", status.value)

const article = computed(() => data.value?.result ?? null)

watchEffect(() => {
  if (status.value === 'error' || !article.value) {
    console.warn('[CMS] Article introuvable ou erreur KQL')
    console.warn('slug:', slug)
    console.warn('data:', data.value)
    console.warn('error:', error.value)
  }
})


</script>



<style scoped lang="scss">
.two-cols {
  display: flex;
  gap: var(--space-xxxl);
  margin-block: var(--space-l);
  margin-bottom: var(--space-xxl);

  .col {
    flex: 1;
    display: flex;
    align-items: flex-start; // nouveau : contenu en haut
    justify-content: flex-start; // nouveau : alignement à gauche
    min-height: 200px;
    min-width: 400px;
  }

  .col-inner {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
}

.v-article-detail__left {
  .main-title {
    text-transform: uppercase;
    line-height: 1.2;
  }
}

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

    p {
      margin-bottom: 1rem;
    }
  }
}



</style>


