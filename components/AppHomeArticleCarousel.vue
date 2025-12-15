<template>
  <div class="article-carousel-wrapper">
    <div
      class="article-carousel"
      ref="carousel"
      @mousedown="startDrag"
      @mousemove="onDrag"
      @mouseup="stopDrag"
      @mouseleave="stopDrag"
      @scroll="onScroll"
    >
      <AppHomeArticle
        v-for="(article, index) in articlesLoop"
        :key="index"
        :v_app_article_data="article"
     />
    </div>

    <div class="carousel-indicators">
      <div
        v-for="(_, index) in latestArticles"
        :key="index"
        class="indicator"
        :class="{ active: index === activeIndex }"
      ></div>
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

const latestArticles = computed(() => props.articles.slice(0, 5))
const articlesLoop = computed(() => [
  ...latestArticles.value,
  ...latestArticles.value,
  ...latestArticles.value,
])

const carousel = ref<HTMLDivElement | null>(null)
const activeIndex = ref(0)
const isDown = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)

onMounted(() => {
  if (carousel.value) {
    const itemWidth = carousel.value.scrollWidth / articlesLoop.value.length
    carousel.value.scrollLeft = itemWidth * 5
  }
})

function onScroll() {
  if (!carousel.value) return

  const scrollLeft = carousel.value.scrollLeft
  const carouselWidth = carousel.value.offsetWidth
  const itemWidth = carousel.value.scrollWidth / articlesLoop.value.length
  const centerPosition = scrollLeft + (carouselWidth / 2)
  const index = Math.floor(centerPosition / itemWidth)

  // Met à jour l'indicateur actif
  activeIndex.value = index % latestArticles.value.length

  // Repositionne sans animation si on atteint les bords
  if (index < latestArticles.value.length) {
    const offset = scrollLeft - (index * itemWidth)
    const newIndex = index + latestArticles.value.length
    carousel.value.scrollLeft = (newIndex * itemWidth) + offset
  } else if (index >= latestArticles.value.length * 2) {
    const offset = scrollLeft - (index * itemWidth)
    const newIndex = index - latestArticles.value.length
    carousel.value.scrollLeft = (newIndex * itemWidth) + offset
  }
}

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
  const walk = (x - startX.value) * 1.5
  carousel.value.scrollLeft = scrollLeft.value - walk
}
</script>

<style scoped lang="scss">
.article-carousel-wrapper {
  margin-top: var(--space-xl);
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
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  user-select: none;
  cursor: grab;

  &.is-dragging {
    cursor: grabbing;
  }
}

.article-carousel::-webkit-scrollbar {
  display: none;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: var(--space-m);
  margin-bottom: var(--space-l);

  .indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid white;
    background-color: transparent;
    transition: background-color 0.3s ease;

    &.active {
      background-color: white;
    }
  }
}
</style>
