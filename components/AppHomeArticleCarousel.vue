<template>
    <div class="article-carousel-wrapper">
      <h1 class="text-white text-center">ACTUS</h1>
   
   
      <div
        class="article-carousel"
        ref="carousel"
        @mousedown="startDrag"
        @mousemove="onDrag"
        @mouseup="stopDrag"
        @mouseleave="stopDrag"
      >
        <AppHomeArticle
          v-for="(article, index) in articlesLoop"
          :key="index"
          :v_app_article_data="article"
       />
      </div>
   
   
      <div class="section">
        <div class="flex flex-center">
          <AppButton
            label="Toutes les actualités"
            to="/actualites"
            variant="cta-actus"
         />
        </div>
      </div>
    </div>
   </template>
   
   
   <script setup lang="ts">
   import { onMounted, ref, computed } from 'vue'
   import AppHomeArticle from './AppHomeArticle.vue'
   
   
   const props = defineProps<{
    articles: CMS_API_Article[]
   }>()
   
   
   // Duplique les articles
   const articlesLoop = computed(() => [
    ...props.articles,
    ...props.articles,
   ])
   
   
   const carousel = ref<HTMLDivElement | null>(null)
   
   
   // Variables pour le drag
   const isDown = ref(false)
   const startX = ref(0)
   const scrollLeft = ref(0)
   
   
   onMounted(() => {
    if (carousel.value) {
      carousel.value.scrollLeft = carousel.value.scrollWidth / 2.5
    }
   })
   
   
   function startDrag(e: MouseEvent) {
    if (!carousel.value) return
    isDown.value = true
    carousel.value.classList.add('is-dragging')
    startX.value = e.pageX - carousel.value.offsetLeft
    scrollLeft.value = carousel.value.scrollLeft
   }
   
   
   function stopDrag() {
    if (!carousel.value) return
    isDown.value = false
    carousel.value.classList.remove('is-dragging')
   }
   
   
   function onDrag(e: MouseEvent) {
    if (!isDown.value || !carousel.value) return
    e.preventDefault()
    const x = e.pageX - carousel.value.offsetLeft
    const walk = (x - startX.value) * 1.5 // facteur de vitesse
    carousel.value.scrollLeft = scrollLeft.value - walk
   }
   </script>
   
   
   <style scoped lang="scss">
   .article-carousel-wrapper {
    margin-top: var(--space-xxl);
    margin-bottom: var(--space-xl);
   
   
    h1 {
      color: var(--color-white);
      text-align: center;
      margin-top: var(--space-xl);
      margin-bottom: var(--space-m);
    }
   }
   
   
   .article-carousel {
    display: flex;
    overflow-x: auto;
    padding-top: var(--space-l);
    padding-bottom: var(--space-xl);
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    //cursor: grab;
    user-select: none;
   
   
    &.is-dragging {
      cursor: grabbing;
      scroll-behavior: auto; // on désactive le smooth scroll pendant le drag
    }
   }
   
   
   .article-carousel::-webkit-scrollbar {
    display: none;
   }
   </style>
   
   
   
   
   
   