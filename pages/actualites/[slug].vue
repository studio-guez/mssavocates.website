<template>
  <main class="v-article-detail">
    <div class="v-article-detail__content">
      <div class="v-article-detail__left">
        <h1 class="main-title">{{ article?.main_title }}</h1>
      </div>

      <div class="v-article-detail__right">
        <p class="article-date">{{ article?.date }}</p>
        <p class="article-accroche"><strong>{{ article?.accroche }}</strong></p>
        <div class="article-body" v-html="article?.contenu" />
      </div>
    </div>

    <div class="v-article-detail__footer">
      <NuxtLink to="/actualites" class="back-button">Retour</NuxtLink>
    </div>
  </main>
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
.v-article-detail {
  padding: var(--space-xl);
  max-width: 1200px;
  margin: 0 auto;
}

.v-article-detail__content {
  display: flex;
  gap: var(--space-xl);
  background: white;
  border-radius: var(--radius-xl);
  border: 2px solid var(--color-pink, #ff00aa);
  padding: var(--space-xl);
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.v-article-detail__left {
  flex: 1;
  padding-right: var(--space-m);

  .main-title {
    font-size: 2rem;
    font-weight: bold;
    text-transform: uppercase;
    line-height: 1.2;
  }
}

.v-article-detail__right {
  flex: 1;
  border-left: 2px solid var(--color-pink, #ff00aa);
  padding-left: var(--space-m);

  .article-date {
    font-size: 0.9rem;
    color: #999;
    margin-bottom: 1rem;
  }

  .article-accroche {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
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

.v-article-detail__footer {
  margin-top: var(--space-l);
  display: flex;
  justify-content: flex-end;

  .back-button {
    background: white;
    border: 2px solid var(--color-pink, #ff00aa);
    padding: 0.5rem 1rem;
    border-radius: var(--radius-m);
    font-weight: bold;
    color: var(--color-pink, #ff00aa);
    text-decoration: none;

    &:hover {
      background: var(--color-pink, #ff00aa);
      color: white;
    }
  }
}
</style>


