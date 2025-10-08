<template>
  <main class="v-contact">
    <div v-if="data && data.status === 'ok'">
      <!-- <h2>Contact</h2> -->

      <StyleBlock>
        <AppContact :v_app_contact_data="data.result" />
      </StyleBlock>
      <section>
        <!-- test data pour debugger -->
        <div>
          <!-- {{ data.result }} -->

        </div>
      </section>
    </div>

    <div v-else>
      <AppError />
    </div>
  </main>
</template>


<script setup lang="ts">

// Définition stricte du type attendu depuis l'API CMS
// Ce type décrit la forme exacte que doivent avoir les données reçues.
// Il est utilisé pour bénéficier de l’autocomplétion, du typage et d’un code plus robuste.


type FetchData = CMS_API_Response & {
  result: CMS_API_contact
}

// Requête API via useFetch() vers le backend Kirby CMS
// Les données reçues sont validées par rapport au type FetchData (ci-dessus).
// Cela permet à TypeScript de garantir la structure de la réponse
// et de proposer de l’autocomplétion pour data.result.home, etc.


// -----------------------------
//   Données de contact
// -----------------------------

const { data, status } = await useFetch<FetchData>('/api/CMS_KQLRequest', {
  lazy: true,
  method: 'POST',
  body: {
    query: "site.find('contact')",
    select: {
      intro: true,
      etude_nom: true,
      etude_email: true,
      etude_tel: true,
      adresse: true,
      membres: {
        query: "page.membres.toStructure()",
        select: {
          nom: "structureItem.nom.value",
          email: "structureItem.email.value"
        }
      },
      image: {
        query: "page.files.filterBy('type', '==', 'image').first",
        select: {
          url: "file.url",
          alt: "file.alt.value",
          reg: "file.resize(1280)"
        }
      }
    }
  }
})

</script>

<style lang="scss" scoped>
.v-contact {}
</style>
