<template>
  <main class="v-contact">
    <template v-if="data">

      <div v-if="data.status === 'ok'">
        <!-- <h2>Contact</h2> -->

        <StyleBlock>
          <AppContact :v_app_contact_data="{ ...data.result.contact, membres: data.result.equipe.profils_list.map(p => ({ nom: p.fullname, email: p.email })) }" />
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
    </template>
  </main>
</template>


<script setup lang="ts">

// Définition stricte du type attendu depuis l'API CMS
// Ce type décrit la forme exacte que doivent avoir les données reçues.
// Il est utilisé pour bénéficier de l’autocomplétion, du typage et d’un code plus robuste.


type FetchData = CMS_API_Response & {
  result: {
    contact: {
      intro: string
      etude_nom: string
      etude_email: string
      etude_tel: string
      adresse: string
      image: CMS_API_PhotoEquipe
    },
    equipe: {
      profils_list: Array<{
        fullname: string
        email: string
      }>
    }
  }
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
    query: "site",
    select: {
      contact: {
        query: "site.find('contact')",
        select: {
          intro: true,
          etude_nom: true,
          etude_email: true,
          etude_tel: true,
          adresse: true,
          image: {
            query: "page.files.filterBy('type', '==', 'image').first",
            select: {
              url: "file.url",
              alt: "file.alt.value",
              reg: "file.resize(1280)"
            }
          }
        }
      },
      equipe: {
        query: "site.find('equipe')",
        select: {
          profils_list: {
            query: "page.profils_list.toStructure()",
            select: {
              fullname: true,
              email: true
            }
          }
        }
      }
    }
  }
})

</script>

<style lang="scss" scoped>
.v-contact {}
</style>
