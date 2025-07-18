<template>
  <main class="v-index">
    <AppHeader />
    <p>{{status}}</p>

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

const { data, status } = await useFetch<FetchData>('/api/CMS_KQLRequest', {
  lazy: true,
  method: 'POST',
  body: {
    query: 'site',
    select: {
      home: {
        query: `site.find("home")`,
        select: {
          title: true,
          slug: true,
          introduction: true,
          titre: true,
          texte: true,
          equipe: 'page.equipe.toStructure()',
          domaines_activities: 'page.domaines_activities.toStructure()'
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
              resume: true,
            }
          }
        }
      }
    }
  }
})





</script>





<style lang="scss" scoped >

</style>
