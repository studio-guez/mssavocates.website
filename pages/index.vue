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
        }
    }
})

</script>





<style lang="scss" scoped >

</style>
