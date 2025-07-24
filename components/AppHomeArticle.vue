
<template>
    <div class="v-article-card">
      <div class="v-article-content">
        <p class="v-article-date">{{ v_app_article_data.date }}</p>
        <h3 class="v-article-title">
          {{ v_app_article_data.main_title?.toUpperCase() }}
        </h3>
        <p class="v-article-resume">
          {{ v_app_article_data.resume }}
        </p>
      </div>
   
   
      <div class="v-article-footer">
        <AppButton
          label="Lire"
          variant="outlined"
          :to="`/actualitees/`"
   
   
   
   
       />
      </div>
    </div>
   </template>
   
   
   
   
   <script setup lang="ts">
   const props = defineProps<{
    v_app_article_data: CMS_API_Article
   }>()
   </script>
   
   
   
   
   
   
   <style lang="scss" scoped >
   
   
   .v-article-card {
    background-color: white;
    border-radius: 2rem;
    padding: var(--space-m);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 300px;
    border: 2px solid var(--color-pink);
   }
   
   
   .v-article-content {
    flex-grow: 1;
   }
   
   
   .v-article-date {
    font-size: 0.875rem;
    color: var(--color-text-muted, #555);
    margin-bottom: var(--space-xs);
   }
   
   
   .v-article-title {
    font-weight: 700;
    font-size: 1rem;
    margin-bottom: var(--space-xs);
    text-transform: uppercase;
   }
   
   
   .v-article-resume {
    font-size: 1rem;
    line-height: 1.4;
    color: var(--color-text, #111);
   }
   
   
   .v-article-footer {
    margin-top: var(--space-m);
    display: flex;
    justify-content: flex-end;
   }
   </style>
   
   
   
   
   
   