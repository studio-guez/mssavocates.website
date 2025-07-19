<template>
  <main class="v-index">
    <AppHeader />

    <template v-if="data && data.status === 'ok'">
      <div><h1>{{data?.result?.home.title}}</h1></div>
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

      <div>
        <h2>equipe</h2>
        <template v-for="people of data.result.home.equipe" :key="people.nom">
          <AppTeam :v_app_team_data="people" />
        </template>
      </div>
<div>
      <AppButton label="Lire" variant="outlined" />
    </div>

<section>
      <div>
      {{data.result}}
    </div>
  </section>

  <div>
  <h2>domaines d'activités</h2>
  <div v-for="bloc in data.result.home.domaines_activite">
    <AppDomaine :v_app_domaine_data="bloc" />
  </div>
</div>


    </template>




<!--          <template v-for="activity of data.result.home.domaines_activites"
              >
          {{activity.image}}
          <template v-for="domaine of activity.domaines">
            <div>
              <h3>{{domaine.titre}}</h3>
              <div v-html="domaine.description"></div>
            </div>
          </template>
        </template>

 -->
<!--  <p>{{ data.result.home.domaines_activite }}</p>
<pre>{{ JSON.stringify(data.result.home.domaines_activite, null, 2) }}</pre>
        <h1>test</h1>

    </template>
    <template v-else>
      oups, la page n'existe pas :/
      -> bouton retour home
    </template>
 -->



  </main>
</template>


<script setup lang="ts">

type FetchData = CMS_API_Response & {
  result: {
    home: {
      title: string
      slug: string
      introduction: CMS_API_hero[]
      titre: string
      texte: string
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
              texte: true,
            }
          },
          domaines_activite: {
            query: 'page.domaines_activite.toStructure()',
            select: {
              domaines: {
                query: 'structureItem.domaines.toStructure()',
                select: {
                  titre: 'structureItem.titre.value',
                  description: 'structureItem.description.value',
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
                }
              }
            }
          },
          equipe: {
            query: "page.equipe.toStructure()",
            select: {
              lien_test: 'structureItem.lien.value',
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
            query: 'page.children()',
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
});



</script>





<style lang="scss" scoped >

</style>
