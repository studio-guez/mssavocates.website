<template>
  <div class="v-article-card" :class="variantClass">
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
        :variant="buttonVariant"
        :to="`/actualites/${v_app_article_data.slug}`"
     />
    </div>
  </div>
 </template>
 
 
 <script setup lang="ts">
 const props = defineProps<{
  v_app_article_data: CMS_API_Article
  variant?: 'white' | 'pink'
 }>()
 
 
 const variantClass = computed(() => `variant-${props.variant || 'white'}`)
 
 
 const buttonVariant = computed(() => {
  return props.variant === 'pink' ? 'outlined-white' : 'outlined'
 })
 </script>
 
 
 <style scoped lang="scss">
 .v-article-card {
  border-radius: var(--radius-l);
  padding: var(--space-l);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid var(--color-pink);
  transition: background-color 0.3s;
  flex: 0 0 auto;
  box-sizing: border-box;
 
 
  &.variant-white {
    background-color: var(--color-white);
    color: var(--color-text);
    width: 620px;
    min-height: 400px;
 
 
    .v-article-title {
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: var(--space-xs);
      text-transform: uppercase;
     }
 
 
    .v-article-resume {
      font-size: 1rem;
      line-height: 1.4;
      color: var(--color-text);
    }
 
 
    .v-article-date {
      color: var(--color-text);
    }
  }
 
 
 
 
  // La variante du rose
  &.variant-pink {
  background-color: var(--color-pink);
  color: var(--color-white);
  width: 100%;
  min-height: 280px;
  padding: var(--space-m);
 
 
  .v-article-title {
    font-size: 0.9rem;
    font-weight: 700;
    margin-bottom: var(--space-xs);
    text-transform: uppercase;
    color: var(--color-white);
  }
 
 
  .v-article-resume {
    font-size: 0.9rem;
    line-height: 1.3;
    color: var(--color-white);
  }
 
 
  .v-article-date {
    font-size: 0.8rem;
    color:var(--color-pink);
  }
 }
 }
 
 
 .v-article-footer {
  margin: var(--space-m);
  display: flex;
  justify-content: flex-end;
 }
 
 
 
 
 </style>
 
 
 
 
 
 