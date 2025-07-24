<template>
  <article v-if="article">
    <h1>{{ article.main_title }}</h1>
    <p class="article__date">{{ article.date }}</p>
    <div class="article__resume" v-html="article.resume" />
    <div class="article__contenu" v-html="article.contenu" />
  </article>
  <p v-else>Chargement ou article introuvable</p>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug

const { data } = await useFetch('/api/CMS_KQLRequest', {
  method: 'POST',
  body: {
    query: `site.find('actualities').children.find("${slug}")`,
    select: {
      date: true,
      main_title: true,
      resume: true,
      contenu: true
    }
  }
})

const article = data?.value?.result
</script>
