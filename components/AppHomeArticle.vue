<template>
  <div class="v-article-card" :class="variantClass">
    <div class="v-article-content">
      <p class="v-article-date body-1">{{ v_app_article_data.date }}</p>
      <h4 class="v-article-title">
        {{ v_app_article_data.main_title?.toUpperCase() }}
      </h4>
      <p class="v-article-resume body-2">
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

   // La base commune 
 .v-article-card {
  border-radius: var(--radius-m);
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid var(--color-pink);
  transition: background-color 0.3s;
  flex: 0 0 auto;
  box-sizing: border-box;
 
 
    // La variante du blanc 
  &.variant-white {
    background-color: var(--color-white);
    width: 620px;
    min-height: 400px;
 
 
    .v-article-title {
      margin-bottom: var(--space-m);
      text-transform: uppercase;
     }
 
 
    .v-article-resume {
      color: var(--color-text);
           margin-bottom: var(--space-m);
    }
 
 
    .v-article-date {
      color: var(--color-text);
       margin-bottom: var(--space-m);
    }
  }
 
 
 
 
  // La variante du rose
  &.variant-pink {
  background-color: var(--color-pink);
  color: var(--color-white);
  width: 100%;
  min-height: 280px;
  padding: var(--space-l);
 
 
  .v-article-title {
    font-size: 0.9rem;
    margin-bottom: var(--space-s);
    text-transform: uppercase;
    color: var(--color-white);
  }
 
 
  .v-article-resume {
      font-size: 0.9rem;
      font-weight: 300;
    color: var(--color-white);
    margin-bottom: var(--space-s);
  }
 
 
  .v-article-date {
   font-size: 0.9rem;
   font-weight: 300;
    color:var(--color-white);
    margin-bottom: var(--space-s);
  }
 }
 }
 
 
 .v-article-footer {
  display: flex;
  justify-content: flex-end;
 }
 
 
 
 
 </style>
 
 
 
 
 
 