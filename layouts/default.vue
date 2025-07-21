<template>
  <div>
    <AppHeader />
    <slot />

    <AppFooter v-if="footer" :v_app_footer_data="footer.result" />
  </div>
</template>
  
  <script setup lang="ts">
  // On redéfinit le type ici, comme tu préfères
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
      query: `site.find("footer")`,
      select: {
        adresse: 'page.adresse.value',
        acces: 'page.acces.value',
        contact: 'page.contact.value',
        accueil: 'page.accueil_telephonique.value'
      }
    }
  })
  </script>
  