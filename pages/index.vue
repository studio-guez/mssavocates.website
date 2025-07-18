<template>
  <main class="v-index">
    <AppHeader />
    <p>{{status}}</p>

    <template v-if="data && data.status === 'ok'">
      <div><h1>{{data?.result?.title}}</h1></div>

      <div>
        <h2>slug</h2>
        /{{data.result.slug}}
      </div>

      <div>
        <h2>introduction</h2>
        {{data.result.introduction}}
      </div>

      <div>
        <h2>titre</h2>
        {{data.result.titre}}
      </div>

      <div>
        <h2>texte</h2>
        {{data.result.texte}}
      </div>

      <div>
        <h2>equipe</h2>
        <template v-for="people of data.result.equipe"
        >
          <AppTeam :v_app_team_data="people" />
        </template>
      </div>
<AppButton label="Lire" variant="outlined" />

      <div>
        <h2>domaines_activite</h2>
        <template v-for="activity of data.result.domaines_activite"
        >
          {{activity.image}}
          <template v-for="domaine of activity.domaines">
            <div>
              <h3>{{domaine.titre  }}</h3>
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

type FetchData  = CMS_API_Response & {
    result: {
        'title' :         string,
        'slug' :          string,
        'introduction' :  string,
        'titre' :         string,
        'texte' :         string,
        'equipe' :        CMS_API_people[],
        domaines_activite: CMS_API_domaines_activite[]
    }
}

const { data, status } = await useFetch<FetchData>('/api/CMS_KQLRequest', {
    lazy: true,
    method: 'POST',
    body: {
        query: `site.find('home')`,
        select: {
            'title' : true,
            'slug' : true,
            'introduction' : true,
            'titre' : true,
            'texte' : true,
            'equipe' : 'page.equipe.toStructure()',
            'domaines_activite': 'page.domaines_activite.toStructure()'
        }
    }
})

</script>





<style lang="scss" scoped >

</style>
