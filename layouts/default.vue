<template>
  <div class="layout-wrapper">
    <AppHeader />
    <main class="layout-main">
      <slot />
    </main>
    <AppFooter v-if="footer" :v_app_footer_data="footer.result" />
  </div>
</template>

<script setup lang="ts">
type FetchFooterData = CMS_API_Response & {
  result: {
    adresse: string
    acces: string
    contact: string
    accueil: string
  }
}

const { data: footer } = await useFetch<FetchFooterData>('/api/CMS_KQLRequest', {
  method: 'POST',
  body: {
    query: `site.find("home")`,
    select: {
      adresse: 'page.adresse.value',
      acces: 'page.acces.value',
      contact: 'page.contact.value',
      accueil: 'page.accueil_telephonique.value'
    }
  }
})
</script>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout-main {
  flex: 1;
  padding-top: 5.5rem;
}
</style>
