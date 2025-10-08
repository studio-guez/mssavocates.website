<!-- pages/dispositifdeprotection.vue -->
<template>
  <main class="v-dispositif">
    <div v-if="data && data.status === 'ok'">
      <StyleBlock>
        <Appaeroport :v_app_contact_data="data.result" />
      </StyleBlock>

 
    </div>

    <div v-else>
      <AppError />
    </div>
  </main>
</template>

<script setup lang="ts">
// On réutilise les coordonnées du CMS (page `contact`) pour alimenter AeroportNotice
type FetchData = CMS_API_Response & { result: CMS_API_contact }

const { data, status } = await useFetch<FetchData>('/api/CMS_KQLRequest', {
  lazy: true,
  method: 'POST',
  body: {
    // si tu crées une page dédiée au CMS, change ici pour "site.find('dispositifdeprotection')"
    query: "site.find('contact')",
    select: {
      etude_nom: true,
      etude_email: true,
      etude_tel: true,
      adresse: true,
      // le reste est inutile pour AeroportNotice mais tu peux le garder si besoin
      membres: {
        query: "page.membres.toStructure()",
        select: {
          nom: "structureItem.nom.value",
          email: "structureItem.email.value"
        }
      },
      image: {
        query: "page.files.filterBy('type', '==', 'image').first",
        select: { url: "file.url", alt: "file.alt.value", reg: "file.resize(1280)" }
      }
    }
  }
})
</script>

<style scoped lang="scss">
.v-dispositif {
  /* rien de spécial à surcharger : StyleBlock + container gèrent les marges */
}
</style>
