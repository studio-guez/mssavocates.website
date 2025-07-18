<template>
  <main class="v-actualities-slug"
  >
    <h1>coucou</h1>
    <p>coucou page {{ slug }}</p>
<!--    {{data.result.title}}-->
  </main>
</template>


<script setup lang="ts">

const slug = useRouter().currentRoute.value.params.slug

const { data, status } = await useFetch<unknown>('/api/CMS_KQLRequest', {
    lazy: true,
    method: 'POST',
    body: {
        query: `site.find('actualites').find(${slug})`,
        select: {
            'title' : true,
        }
    }
})


</script>


<style lang="scss" scoped>
.v-actualities-slug {
}
</style>
