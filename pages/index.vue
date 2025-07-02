<template>
  <main class="v-index"
  >
<!--    <p>{{status}}</p>-->
<!--    <p>{{data}}</p>-->
<!--    <template v-for="product of data?.products">-->
<!--      <h2>{{product.title}}</h2>-->
<!--      <AppButton-->
<!--              v-for="tag of product.tags"-->
<!--              :message="tag"-->
<!--      />-->
<!--    </template>-->
  </main>
</template>


<script setup lang="ts">
import AppButton from "~/components/AppButton.vue";

console.log(await (await fetch('/api/test')).text())

// const { data, status } = await useFetch<ProductResponse>('http://localhost:8000/api/query', {
//     lazy: true,
//     method: 'POST',
//     body: {
//         query: 'site().children',
//         select: {
//             'title' : true,
//             'slug' : true,
//             'contenu' : true,
//             'show_in_nav' : true,
//         }
//     }
// })
//
// console.log(data.value)

</script>





<style lang="scss" scoped >

</style>
