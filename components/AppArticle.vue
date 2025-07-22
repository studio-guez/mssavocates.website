<template>
    <section class="v-app-article">
        <h3>{{v_app_article_data.date}}</h3>
        <h3>{{v_app_article_data.main_title}}</h3>
        <h3>{{v_app_article_data.resume}}</h3>
        <div v-html="v_app_article_data.contenu"></div>
    </section>
</template>





<script setup lang="ts">
const props = defineProps<{
  v_app_article_data: CMS_API_Article 
}>()
</script>





<style lang="scss" scoped >
.v-app-article {
}
</style>
