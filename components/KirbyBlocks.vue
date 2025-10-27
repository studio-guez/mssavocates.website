<template>
  <div class="kirby-blocks">
    <template v-for="block in parsedBlocks" :key="block.id">
      <!-- Bloc de texte -->
      <div v-if="block.type === 'text'" class="kirby-block-text" v-html="block.content.text" />

      <!-- Bloc d'image -->
      <div v-else-if="block.type === 'image'" class="kirby-block-image">
        <img
          v-if="block.content.image && block.content.image[0]"
          :src="getImageUrl(block.content.image[0])"
          :alt="block.content.alt || ''"
        />
        <p v-if="block.content.caption" class="image-caption">{{ block.content.caption }}</p>
      </div>

      <!-- Bloc de liste -->
      <div v-else-if="block.type === 'list'" class="kirby-block-list" v-html="block.content.text" />

      <!-- Bloc heading -->
      <div
        v-else-if="block.type === 'heading'"
        class="kirby-block-heading"
        v-html="getHeadingHtml(block.content)"
      />

      <!-- Autres types de blocs non gérés -->
      <div v-else class="kirby-block-unknown">
        <pre>{{ block }}</pre>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  blocks: string | any[]
  files?: any[]
}>()

const parsedBlocks = computed(() => {
  if (!props.blocks) return []

  // Si c'est déjà un array, on le retourne
  if (Array.isArray(props.blocks)) {
    return props.blocks.filter(block => !block.isHidden)
  }

  // Si c'est une string JSON, on la parse
  if (typeof props.blocks === 'string') {
    try {
      const parsed = JSON.parse(props.blocks)
      return Array.isArray(parsed) ? parsed.filter(block => !block.isHidden) : []
    } catch (e) {
      console.error('Error parsing blocks:', e)
      return []
    }
  }

  return []
})

function getHeadingHtml(content: any): string {
  // Kirby envoie level comme 'h2', 'h3', etc. Il faut extraire juste le chiffre
  const levelStr = content.level || 'h2'
  const level = levelStr.replace('h', '') || '2'
  const text = content.text || ''

  return `<h${level}>${text}</h${level}>`
}

function getImageUrl(fileRef: string): string {
  // Convertit file://xyz en URL du CMS
  if (fileRef.startsWith('file://')) {
    // Cherche le fichier correspondant dans la liste des fichiers
    if (props.files && Array.isArray(props.files)) {
      // Le fichier a un uuid avec le préfixe "file://"
      let file = props.files.find(f => f.uuid === fileRef)

      if (file?.url) {
        return file.url
      }
    }

    // Fallback : si on a un seul fichier, on le retourne
    if (props.files && props.files.length === 1) {
      return props.files[0].url
    }

    // Fallback : construction d'URL basique
    const fileUuid = fileRef.replace('file://', '')
    return `http://localhost:8000/media/pages/actualites/${fileUuid}`
  }
  return fileRef
}
</script>

<style scoped lang="scss">
.kirby-blocks {
  display: flex;
  flex-direction: column;
  gap: var(--space-m);
}

.kirby-block-text {
  line-height: 1.7;
}

.kirby-block-text :deep(p) {
  margin-bottom: var(--space-m);
}

.kirby-block-image img {
  width: 100%;
  height: auto;
  border-radius: var(--radius-s);
}

.kirby-block-image .image-caption {
  margin-top: var(--space-xs);
  font-size: 0.9rem;
  color: #666;
  font-style: italic;
}

.kirby-block-list :deep(ul),
.kirby-block-list :deep(ol) {
  padding-left: var(--space-l);
  margin: var(--space-m) 0;
}

.kirby-block-list :deep(li) {
  margin-bottom: var(--space-xs);
  line-height: 1.5;
}

.kirby-block-unknown {
  background: #f5f5f5;
  padding: var(--space-s);
  border-radius: var(--radius-s);
  font-size: 0.85rem;
}
</style>

<style lang="scss">
// Styles NON scoped pour les headings - permettent aux styles globaux de s'appliquer
.kirby-block-heading {
  h1, h2, h3, h4, h5, h6 {
    margin-top: var(--space-l);
    margin-bottom: var(--space-m);
  }
}
</style>
