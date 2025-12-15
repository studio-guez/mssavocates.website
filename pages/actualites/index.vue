<template>
  <main class="v-actualities">
    <template v-if="children_data">
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
    </template>
  </main>
</template>



<script setup lang="ts">
type FetchData_children = CMS_API_Response & {
  result: CMS_API_Article[],
}

const { data: children_data, status: children_status } = await useFetch<FetchData_children>('/api/CMS_KQLRequest', {
  lazy: true,
  method: 'POST',
  body: {
    query: `site.find('actualites').children().listed().sortBy("date", "desc")`,
    select: {
      title: true,
      slug: true,
      resume: 'page.resume.value',
      date: true,
      main_title: true,
      contenu: 'page.contenu.value',
      accroche: true,
    }
  }
})

// Signal que les données initiales sont chargées
const { setInitialDataLoaded } = useAppLoading()
watch(() => children_data.value, (newData) => {
  if ( newData ) {
    setInitialDataLoaded()
  }
}, { immediate: true })

</script>


<style lang="scss" scoped>
.v-actualities {
  display: flex;
  flex-direction: column;
  gap: 0;
}
</style>
