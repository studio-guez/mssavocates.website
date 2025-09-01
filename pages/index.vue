Index 

<template>
  <main class="v-index">
    <template v-if="data && data.status === 'ok'">
      <div>
        <!-- <h1>{{ data?.result?.home.title }}</h1> -->
      </div>

      <!-- hero= texte + articles  -->
      <StyleBlock withDivider dividerPosition="leftSplit">
        <AppHero
          :v_app_hero_data="data.result.home.introduction[0]"
          :articles="articlesHero"
        />
      </StyleBlock>

      <!-- photo équipe  -->
      <StyleBlock class="is-fill">
        <img :src="data.result.home.photo_equipe.reg.url" class="img-full" />
      </StyleBlock>

      <!-- équipe  -->
      <StyleBlock>
        <div class="container" id="equipe">
          <h2 class="light">EQUIPE</h2>

          <div class="flex flex-center" style="flex-wrap: wrap; gap: var(--space-xl);">
            <AppTeam
              v-for="person in data.result.home.equipe"
              :key="`${person.prenom}-${person.nom}`"
              :v_app_team_data="person"
            />
          </div>
        </div>
      </StyleBlock>

      <!-- domaines d'activités  -->
      <StyleBlock id="domaines">
        <div>
          <div v-for="domaine in data.result.home.domaines_activite">
            <AppDomaine :v_app_domaine_data="domaine" />
          </div>
        </div>
      </StyleBlock>

      <!-- Articles Home  -->
      <AppHomeArticleCarousel :articles="articlesHome" variant="white" />
    </template>

    <!-- page d'erreur -->
    <template v-else>
      oups, la page n'existe pas :/
      -> bouton retour home
    </template>
  </main>
</template>


<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, watch, nextTick } from 'vue'

const route = useRoute()

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
            query: 'page.children().listed().sortBy("date", "desc")',
            select: {
              main_title: true,
              date: true,
              resume: true,
              slug: true
            }
          }
        }
      }
    }
  }
}).then(data => {
  scrollToHash(route.hash)
  return data
})

const articlesAll = computed(() => data.value?.result.actualites.articles || [])
const articlesHero = computed(() => articlesAll.value.slice(0, 2))
const articlesHome = computed(() => articlesAll.value.slice(0, 4))

// 👉 Ajout scroll automatique vers ancre si route.hash existe
function scrollToHash(hash: string) {
  if (!hash) return
  window.setTimeout(() => {
    const el = document.querySelector(hash)
    if (el) {
      console.log(hash)
      el.scrollIntoView({ behavior: 'smooth' })
    }
  },500)
}
</script>

<style lang="scss" scoped></style>

