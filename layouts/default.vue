<template>
  <div class="layout-wrapper">
    <AppHeader />
    <main class="layout-main">
      <slot />
    </main>
    <div class="layout-wrapper__scroll-to-top"
         v-if="useRoute().path === '/'"
    >
      <button class="layout-wrapper__scroll-to-top__ui"
              @click="goToTopOfPage()"
      >↑</button>
    </div>
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
    query: `site.find("footer")`,
    select: {
      adresse: 'page.adresse.value',
      acces: 'page.acces.value',
      contact: 'page.contact.value',
      accueil: 'page.accueil_telephonique.value'
    }
  }
})

function goToTopOfPage() {
  window.scroll( { top: 0, behavior: 'smooth' })
}

</script>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout-main {
  flex: 1;
  padding-top: 6rem;
}

.layout-wrapper__scroll-to-top {
  position: sticky;
  bottom: 0;
  z-index: 50;
  border: none;
}
.layout-wrapper__scroll-to-top__ui {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  background: var(--color-pink);
  color: var(--color-white);
  font-family: var(--font-NewEdge), sans-serif;
  font-size: 2rem;
  line-height: 1em;
  text-align: center;
  display: block;
  width: 3rem;
  height: 3rem;
  padding: 0.2em 0 0 0.15em;
  box-sizing: border-box;
  border-radius: 100%;
  border: solid 1px var(--color-white);
  cursor: pointer;
}
</style>
