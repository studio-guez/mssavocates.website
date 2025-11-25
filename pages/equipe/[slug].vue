<template>
  <main class="v-equipe-slug" >
    <template v-if="data && data.status === 'ok'">
      <StyleBlock withDivider dividerPosition="center">
        <AppProfilsEquipe
          :profil="data?.result"
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
      fullname: true,
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

</script>


<style lang="scss" scoped>
.v-equipe-slug {
}
</style>
