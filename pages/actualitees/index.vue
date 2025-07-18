<template>
  <main class="v-actualities"
  >
    <p>liste des actualitées</p>
    {{data}}
  </main>
</template>


<script setup lang="ts">

type FetchData  = CMS_API_Response & {
    result: {}
}

const { data, status } = await useFetch<FetchData>('/api/CMS_KQLRequest', {
    lazy: true,
    method: 'POST',
    body: {
        query: `site.find('actualites')`,
        select: {
            'title' : true,
            'slug' : true,
            'children' : 'page.children.toArray()',
        }
    }
})
</script>


<style lang="scss" scoped>
.v-actualities {
}
</style>
