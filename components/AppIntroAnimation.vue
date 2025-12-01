<template>
  <Transition name="fade">
    <div v-if="isVisible" class="intro-animation" :class="{ 'is-closing': isClosing }">
      <div class="intro-animation__circle"></div>
      <img
        src="/img/mss_logo--white.svg"
        alt="MSS Logo"
        class="intro-animation__logo"
        :class="{ 'is-scaled': isClosing }"
      />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = defineProps<{
  isDataLoaded: boolean
}>()

const emit = defineEmits<{
  complete: []
}>()

const isVisible = ref(true)
const isClosing = ref(false)
const minDisplayTime = 2000 // 2 secondes minimum

let startTime: number

onMounted(() => {
  startTime = Date.now()
})

// Surveiller le chargement des données
watch(() => props.isDataLoaded, (loaded) => {
  if (loaded) {
    const elapsed = Date.now() - startTime
    const remainingTime = Math.max(0, minDisplayTime - elapsed)

    // Attendre le temps minimum si nécessaire
    setTimeout(() => {
      startClosingAnimation()
    }, remainingTime)
  }
})

function startClosingAnimation() {
  isClosing.value = true

  // Attendre la fin de l'animation avant de cacher complètement
  setTimeout(() => {
    isVisible.value = false
    emit('complete')
  }, 2_000) // Durée de l'animation de fermeture
}
</script>

<style lang="scss" scoped>
.intro-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  pointer-events: none;

  &__circle {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-pink);
    transition: clip-path 2s cubic-bezier(0.85, 0, 0.15, 1);
    clip-path: circle(150% at 50% 50%);
  }

  &.is-closing &__circle {
    clip-path: circle(0% at 50% 50%);
  }

  &__logo {
    position: relative;
    z-index: 1;
    width: 200px;
    height: auto;
    border-radius: 0;
    transition: transform 1.5s ease-in-out, opacity 0.5s 1s ease;

    @media (max-width: 768px) {
      width: 150px;
    }

    &.is-scaled {
      transform: scale(0.85);
      opacity: 0;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
