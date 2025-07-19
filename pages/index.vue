<template>
  <main class="v-index">
    <AppHeader />

    <template v-if="data && data.status === 'ok'">
      <div><h1>{{data?.result?.home.title}}</h1></div>

      <div>
        <h2>slug</h2>
        /{{data.result.home.slug}}
      </div>

      <div>
        <h2>introduction</h2>
      {{data.result.home.introduction}}
      </div>

      <div>
        <h2>titre</h2>
        <template v-for="hero of data.result.home.introduction">
          <AppHero :v_app_hero_data="hero" />
        </template>
       <!-- {{data.result.titre}}-->
      </div>

      <div>
        <h2>articles</h2>
       <template v-for="article of data.result.actualites.articles">
        <AppArticle :v_app_article_data="article"/>
       </template>
      </div>

      <div>
        <h2>equipe</h2>
       <template v-for="people of data.result.home.equipe">
          <AppTeam :v_app_team_data="people" />
        </template>
      </div>
        <AppButton label="Lire" variant="outlined" />

      <div>
        <h2>domaines_activite</h2>
         <template v-for="activity of data.result.home.domaines_activities"
              >
          {{activity.image}}
          <template v-for="domaine of activity.domaines">
            <div>
              <h3>{{domaine.titre}}</h3>
              <div v-html="domaine.description"></div>
            </div>
          </template>
        </template>

        <h1>teste</h1>
        {{data.result}}
      </div>


    </template>
    <template v-else>
      oups, la page n'existe pas :/
      -> bouton retour home
    </template>




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
      domaines_activities: CMS_API_domaines_activite[]
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
                    introduction: true,
                    titre: true,
                    texte: true,
                    domaines_activities: 'page.domaines_activities.toStructure()',
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
                                    xxl: 'file.resize(2500)',
                                }
                            },
                            caption: "structureItem.caption.value"
                        }
                    }
                },
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
                            resume: true,
                        }
                    }
                }
            },
        },


    }
})


</script>





<style lang="scss" scoped >

</style>
