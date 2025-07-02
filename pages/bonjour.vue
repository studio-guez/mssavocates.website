<template>
  <main class="v-bonjour"
  >
    <p>{{ status }}</p>
    <p>{{ data?.total }}</p>
  </main>
</template>


<script setup lang="ts">

const {data, status} = await useFetch<any>('https://dummyjson.com/products', {
    lazy: true,
})

</script>


<style lang="scss" scoped>
.v-bonjour {
}
</style>
