<template>
  <section class="v-style-block is-fill">
    <div class="container">
      <h2 class="v-app-domaine__titre light">{{ titre }}</h2>
    </div>

    <div class="two-cols container">
      <div class="col">
        <div class="col-inner v-app-domaine__text">
          <template v-for="(block, index) in colonneGauche" :key="index">
            <h4 v-if="block.type === 'soustitre'" v-html="block.content?.text"></h4>
            <div v-else-if="block.type === 'text'" v-html="block.content?.text"></div>
            <div v-else-if="block.type === 'list'" class="v-app-domaine__list" v-html="block.content?.text"></div>
            <img
              v-else-if="block.type === 'image' && block.content?.image && getImageFromUuid(block.content.image)"
              :src="getImageFromUuid(block.content.image)?.reg?.url"
              :alt="block.content?.alt || getImageFromUuid(block.content.image)?.alt || ''"
              class="v-app-domaine__image"
            />
          </template>
        </div>
      </div>

      <div class="col">
        <div class="col-inner v-app-domaine__text">
          <template v-for="(block, index) in colonneDroite" :key="index">
            <h4 v-if="block.type === 'soustitre'" v-html="block.content?.text"></h4>
            <div v-else-if="block.type === 'text'" v-html="block.content?.text"></div>
            <div v-else-if="block.type === 'list'" class="v-app-domaine__list" v-html="block.content?.text"></div>
            <img
              v-else-if="block.type === 'image' && block.content?.image && getImageFromUuid(block.content.image)"
              :src="getImageFromUuid(block.content.image)?.reg?.url"
              :alt="block.content?.alt || getImageFromUuid(block.content.image)?.alt || ''"
              class="v-app-domaine__image"
            />
          </template>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup lang="ts">
import { defineProps, onMounted, computed } from 'vue'

const props = defineProps<{
  titre: string
  colonneGauche: any[]
  colonneDroite: any[]
  images: any[]
}>()

// Crée un map UUID -> image pour accès rapide
const imagesByUuid = computed(() => {
  const map: Record<string, any> = {}
  props.images?.forEach(img => {
    if (img.uuid) {
      map[img.uuid] = img
    }
  })
  return map
})

// Fonction pour obtenir l'image depuis un UUID
const getImageFromUuid = (uuid: string | string[]) => {
  if (Array.isArray(uuid) && uuid.length > 0) {
    uuid = uuid[0]
  }
  if (typeof uuid === 'string') {
    // Essaie avec et sans le préfixe file://
    const img = imagesByUuid.value[uuid] || imagesByUuid.value[uuid.replace('file://', '')] || imagesByUuid.value['file://' + uuid]
    return img
  }
  return null
}

onMounted(() => {
  console.log('Colonne Gauche:', props.colonneGauche)
  console.log('Colonne Droite:', props.colonneDroite)
  console.log('Images:', props.images)
})
</script>



<style scoped lang="scss">

.v-style-block {
  margin-bottom: var(--space-xxl);
}

.v-app-domaine__titre {
  margin-bottom: 0;
  text-transform: uppercase;
}

.v-app-domaine__text {
  display: flex;
  flex-direction: column;
  gap: var(--space-mn);
}

.v-app-domaine__text h4 {
  color: var(--color-pink);
  font-weight: 600;
  margin-bottom: var(--space-xs);
}

.v-app-domaine__list :deep(ul) {
  list-style: disc;
  padding-left: var(--space-l);
  margin-bottom: var(--space-m);
}

.v-app-domaine__list :deep(li) {
  margin-bottom: var(--space-s);
}

.v-app-domaine__list :deep(li::marker) {
  color: var(--color-pink);
}

.v-app-domaine__image {
  width: 100%;
  height: auto;
  border-radius: var(--radius-s);
  margin: var(--space-m) 0;
}

/* ✅ Fix responsive : colonnes flex qui ne débordent pas */
.two-cols {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr));
  gap: var(--space-xxxl);
}
@media (max-width: 900px) {
  .two-cols { gap: var(--space-l); } /* optionnel : gap plus petit en mobile */
}

</style>

