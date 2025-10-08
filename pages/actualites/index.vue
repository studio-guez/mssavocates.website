<template>
  <main class="v-actualities">
    <template v-if="children_data && children_data.status === 'ok'">
      <div class="v-actualities__content">
        <!-- {{ data?.result }} -->
      </div>

      <AppArticle
        v-for="(article, i) in children_data?.result"
        :key="article.slug"
        :v_app_article_data="article"
        :isPreview="true"
        :reversed="i % 2 === 1"
      />
    </template>

    <template v-else>
      <AppError />
    </template>
  </main>
</template>



<script setup lang="ts">

// type FetchData = CMS_API_Response & {
//   result: {}
// }

// const { data, status } = await useFetch<FetchData>('/api/CMS_KQLRequest', {
//   lazy: true,
//   method: 'POST',
//   body: {
//     query: `site.find('actualites')`,
//     select: {
//       'title': true,
//       'slug': true,
//     }
//   }
// })

type FetchData_children = CMS_API_Response & {
  result: CMS_API_Article[],
}

const { data: children_data, status: children_status } = await useFetch<FetchData_children>('/api/CMS_KQLRequest', {
  lazy: true,
  method: 'POST',
  body: {
    query: `site.find('actualites').children()`,
    select: {
      'title': true,
      'slug': true,
      'resume': true,
      'date': true,
      'main_title': true,
      'contenu': true,
      'accroche': true,
    }
  }
})

</script>


<style lang="scss" scoped>
.v-actualities {}
</style>
