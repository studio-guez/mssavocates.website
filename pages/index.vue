<template>
  <main class="v-index">
    <template v-if="data && data.status === 'ok'">
      <div>
        <!-- <h1>{{ data?.result?.home.title }}</h1> -->
      </div>
      <!--  
      <div>
        <h2>slug</h2>
        /{{data.result.home.slug}}
      </div>

     <div>
        <h2>introduction</h2>
      {{data.result.home.introduction}}
      </div>
 -->

      <!-- hero= texte + articles  -->
      <StyleBlock>
        <div>
          <h2>hero</h2>
          <template v-for="hero of data.result.home.introduction">
            <AppHero :v_app_hero_data="hero" />
          </template>
        </div>

        <div>
          <h2>hero articles</h2>
          <template v-for="article of data.result.actualites.articles">
            <AppArticle :v_app_article_data="article" />
          </template>
        </div>
      </StyleBlock>

      <!-- photo équipe  -->
      <StyleBlock class="is-fill">
        <img :src="data.result.home.photo_equipe.reg.url" class="img-full" />
      </StyleBlock>

      <!-- équipe  -->
      <StyleBlock>
        <h2 class="mb-s">EQUIPE</h2>


        <div class="flex flex-center" style="flex-wrap: wrap; gap: var(--space-xl);">
          <AppTeam v-for="person in data.result.home.equipe" :key="`${person.prenom}-${person.nom}`"
            :v_app_team_data="person" />
        </div>
      </StyleBlock>





      <!-- domaines d'activités  -->
      <StyleBlock>
        <div>
          <div v-for="domaine in data.result.home.domaines_activite">
            <AppDomaine :v_app_domaine_data="domaine" />
          </div>
        </div>
      </StyleBlock>

      <!-- Articles Home  -->

      <h2 class="mb-s">Articles</h2>

      <div class="article-grid">
        <AppHomeArticle v-for="article in data.result.actualites.articles" :v_app_article_data="article" />
      </div>

      <div class="section">
        <div class="flex flex-center">
          <AppButton label="Toutes les actualités" href="/actualitees" variant="outlined-white" />
        </div>
      </div>

      <!-- test data pour debugger  -->


      <section>
        <div>
          {{ data.result }}
        </div>
      </section>



      <!-- <pre>{{ JSON.stringify(data.result.home.domaines_activite, null, 2) }}</pre> -->


    </template>

    <!-- page d'erreur -->

    <template v-else>
      oups, la page n'existe pas :/
      -> bouton retour home
    </template>

    <!-- footer -->


  </main>
</template>


<script setup lang="ts">

// Définition stricte du type attendu depuis l'API CMS
// Ce type décrit la forme exacte que doivent avoir les données reçues.
// Il est utilisé pour bénéficier de l’autocomplétion, du typage et d’un code plus robuste.

type FetchData = CMS_API_Response & {
  result: {
    home: {
      title: string
      slug: string
      introduction: CMS_API_hero[]
      titre: string
      texte: string
      photo_equipe: CMS_API_PhotoEquipe
      equipe: CMS_API_people[]
      domaines_activite: CMS_API_domaines_activite[]
    },
    actualites: {
      title: string
      slug: string
      articles: CMS_API_Article[]
    }
  }
}

// Requête API via useFetch() vers le backend Kirby CMS
// Les données reçues sont validées par rapport au type FetchData (ci-dessus).
// Cela permet à TypeScript de garantir la structure de la réponse
// et de proposer de l’autocomplétion pour data.result.home, etc.

const { data: data, status: status_test } = await useFetch<FetchData>('/api/CMS_KQLRequest', {
  lazy: true,
  method: 'POST',
  body: {
    query: 'site',
    select: {
      home: {
        query: "site.find('home')",
        select: {
          title: true,
          slug: true,

          introduction: {
            query: "page.introduction.toStructure()",
            select: {
              titre: true,
              texte: true
            }
          },

          photo_equipe: {
            query: 'page.photo_equipe.toFiles.first',
            select: {
              alt: "file.alt.value",
              tiny: 'file.resize(50, null, 10)',
              small: 'file.resize(500)',
              reg: 'file.resize(1280)',
              large: 'file.resize(1920)',
              xxl: 'file.resize(2500)'
            }
          },

          domaines_activite: {
            query: 'page.domaines_activite.toStructure()',
            select: {
              domaines: {
                query: 'structureItem.domaines.toStructure()',
                select: {
                  titre: 'structureItem.titre.value',
                  description: 'structureItem.description.value'
                }
              },
              image: {
                query: "structureItem.image.toFile",
                select: {
                  alt: "file.alt.value",
                  tiny: 'file.resize(50, null, 10)',
                  small: 'file.resize(500)',
                  reg: 'file.resize(1280)',
                  large: 'file.resize(1920)',
                  xxl: 'file.resize(2500)'
                }
              }
            }
          },

          equipe: {
            query: "page.equipe.toStructure()",
            select: {
              lien_test: 'structureItem.lien.value',
              prenom: 'structureItem.prenom.value',
              nom: 'structureItem.nom.value',
              image: {
                query: "structureItem.image.toFile",
                select: {
                  alt: "file.alt.value",
                  tiny: 'file.resize(50, null, 10)',
                  small: 'file.resize(500)',
                  reg: 'file.resize(1280)',
                  large: 'file.resize(1920)',
                  xxl: 'file.resize(2500)'
                }
              },
              caption: "structureItem.caption.value"
            }
          }
        }
      },

      actualites: {
        query: `site.find("actualites")`,
        select: {
          title: true,
          slug: true,
          articles: {
            query: 'page.children().listed().sortBy("date", "desc").limit(4)',
            select: {
              main_title: true,
              date: true,
              resume: true
            }
          }
        }
      }
    }
  }
})





</script>





<style lang="scss" scoped></style>



<!-- //  On utilise 'POST' ici car l’API KQL de Kirby nécessite un corps de requête (body) contenant le query KQL.
// Contrairement à une API REST classique en GET, ici on interroge une "base de données" via un langage spécifique (Kirby Query Language).
// Le corps contient un objet `{ query: ..., select: ... }` qui décrit précisément quelles données on veut extraire du CMS. -->


<!-- //  .toStructure() transforme le champ "Structure" défini dans le blueprint YAML (ex: `introduction`) 
// en un tableau exploitable dans le template (array d’objets JS).
// En KQL, cela permet de parcourir chaque entrée du champ structuré (titre, texte...).
// Ex: un groupe de plusieurs sections dans un Hero, une équipe, des items de domaine... -->


<!-- //  structureItem fait référence à **l’élément courant** dans la boucle interne d’un champ structure (ex: domaines).
// C’est une syntaxe spécifique de KQL utilisée à l’intérieur d’un `.toStructure()` pour accéder aux champs de chaque "row".
// On l’utilise pour aller chercher les valeurs unitaires : structureItem.titre.value, structureItem.image.toFile, etc. -->