<template>
  <StyleBlock :withDivider="true" dividerPosition="center" :isShortDivider="true">
    <main class="v-geneve-aeroport">
      <template v-if="data">
        <template v-if="data.status === 'ok'">
          <div class="two-cols container">
            <!-- Colonne gauche : titre -->
            <div class="col">
              <div class="col-inner v-geneve-aeroport__left">
                <h2 class="main-title">{{ pageData?.main_title }}</h2>
              </div>
            </div>

            <!-- Colonne droite : contenu -->
            <div class="col">
              <div class="col-inner v-geneve-aeroport__right">
                <div class="v-geneve-aeroport__right-content">
                  <KirbyBlocks :blocks="pageData?.contenu" :files="pageData?.files" class="page-body" />
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <AppError />
        </template>
      </template>
    </main>
  </StyleBlock>
</template>

<script setup lang="ts">

const { data } = await useFetch<CMS_API_Response & { result: CMS_API_Article }>('/api/CMS_KQLRequest', {
  lazy: true,
  method: 'POST',
  body: {
    query: `site.find("geneve-aeroport")`,
    select: {
      main_title: true,
      contenu: 'page.contenu.toBlocks',
      slug: true,
      files: {
        query: 'page.files',
        select: {
          id: true,
          uuid: true,
          url: true,
          filename: true,
          name: true
        }
      }
    }
  }
})

const pageData = computed(() => data.value?.result ?? null)

// Signal que les données initiales sont chargées
const { setInitialDataLoaded } = useAppLoading()
watch(() => data.value, (newData) => {
  if ( newData ) {
    setInitialDataLoaded()
  }
}, { immediate: true })

</script>

<style scoped lang="scss">
/* Grille responsive sans @media : 1–2 colonnes selon la largeur */
.two-cols {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--space-xxl);
  margin-block: var(--space-l);
  margin-bottom: var(--space-xxl);
}

.two-cols .col {
  min-width: 0;
}

.two-cols .col .col-inner {
  width: 100%;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* Titre gauche */
.v-geneve-aeroport__left .main-title {
  text-transform: uppercase;
  line-height: 1.2;
}

/* Colonne droite */
.v-geneve-aeroport__right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 100%;

  .v-geneve-aeroport__right-content {
    flex-grow: 1;
  }
}

/* Contenu page */
.v-geneve-aeroport__right-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-m);

  .page-body {
    font-size: 1rem;
    line-height: 1.7;
    color: #333;
    overflow-wrap: anywhere;

    p { margin-bottom: 1rem; }
    img { max-width: 100%; height: auto; display: block; }
  }
}
</style>
