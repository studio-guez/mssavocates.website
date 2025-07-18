<template>
  <main class="v-actualities"
  >
    <div class="v-actualities__content">
      <h2>contenu de la page</h2>
      {{data?.result}}
    </div>

    <div class="v-actualities__children">
      <h2>contenu des pages enfant</h2>
      <div class="v-actualities__children__item"
           v-for="item of children_data?.result"
      >
      {{item}}
      </div>
    </div>

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
        }
    }
})

type FetchData_children  = CMS_API_Response & {
    result: {}
}

const {data: children_data, status: children_status} = await useFetch<FetchData_children>('/api/CMS_KQLRequest', {
    lazy: true,
    method: 'POST',
    body: {
        query: `site.find('actualites').children()`,
        select: {
            'title' : true,
            'slug' : true,
        }
    }
})

</script>


<style lang="scss" scoped>
.v-actualities {
}
</style>
