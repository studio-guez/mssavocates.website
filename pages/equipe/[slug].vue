<template>
  <main class="v-equipe-slug" >
    <template v-if="data && data.status === 'ok'">
      <StyleBlock withDivider dividerPosition="center">
        <AppProfilsEquipe
          :profil="data?.result"
          :next_slug_profil="nextSlugProfil"
        />
      </StyleBlock>
    </template>

    <template v-else>
      <AppError />
    </template>
  </main>
</template>


<script setup lang="ts">

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const nextSlugProfil = ref<null | string>(null)

type FetchData = CMS_API_Response & {
  result: CMS_API_profil
}

// -----------------------------
//   Données équipes
// -----------------------------

const { data, status } = await useFetch<FetchData>('/api/CMS_KQLRequest', {
  lazy: true,
  method: 'POST',
  body: {
    query: `site.find('/equipe/${slug.value}')`,
    select: {
      title: true,
      slug: true,
      email: true,
      description: true,
      photo: {
        query: "page.photo_full.toFile()",
        select: {
          alt: true,
          tiny: "file.resize(100)",
          small: "file.resize(400)",
          reg: "file.resize(800)",
          large: "file.resize(1200)",
          xxl: "file.resize(2000)"
        }
      }

    }
  }
})



const { data: profilesData, status: profilesStatus } = await useFetch<FetchData>('/api/CMS_KQLRequest', {
  lazy: true,
  method: 'POST',
  body: {
    query: `site.find('/equipe').children()`,
    select: {
      title: true,
      slug: true,
      email: true,
      description: true,
      photo: {
        query: "page.photo_full.toFile()",
        select: {
          alt: true,
          tiny: "file.resize(100)",
          small: "file.resize(400)",
          reg: "file.resize(800)",
          large: "file.resize(1200)",
          xxl: "file.resize(2000)"
        }
      }

    }
  }
})

// Calculer le slug du profil suivant
watch([profilesData, slug], () => {
  if (profilesData.value?.result && Array.isArray(profilesData.value.result)) {
    const profiles = profilesData.value.result
    const currentIndex = profiles.findIndex(p => p.slug === slug.value)

    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % profiles.length
      nextSlugProfil.value = `/equipe/${profiles[nextIndex].slug}`
    }
  }
}, { immediate: true })


</script>


<style lang="scss" scoped>
.v-equipe-slug {
}
</style>
