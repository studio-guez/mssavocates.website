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

      <div class="stacked-section">
        <!-- photo équipe  -->
        <div
          class="stacked-card"
          :class="{ expanded: expandedCards.photo }"
          @click="expandedCards.photo = !expandedCards.photo"
        >
          <StyleBlock class="is-fill">
            <img :src="data.result.home.photo_equipe.reg.url" class="img-full" />
          </StyleBlock>
        </div>

        <!-- équipe  -->
        <div
          id="equipe"
          class="stacked-card"
          :class="{ expanded: expandedCards.equipe }"
          @click="expandedCards.equipe = !expandedCards.equipe"
        >
          <StyleBlock>
            <div class="container">
              <h2 class="light">EQUIPE</h2>

              <div class="flex flex-center" style="flex-wrap: wrap; gap: var(--space-xl);">
                <AppTeam
                  v-for="person in data.result.equipe.profils_list"
                  :key="person.fullname"
                  :v_app_team_data="person"
                />
              </div>
            </div>
          </StyleBlock>
        </div>

        <!-- domaines d'activités  -->
        <div
          class="stacked-card expanded"
          id="domaines"
        >
          <StyleBlock>
            <div>
              <AppDomaine
                :titre="data.result.home.domaines_titre || 'Domaines d\'activités'"
                :colonneGauche="data.result.home.domaines_activite_gauche || []"
                :colonneDroite="data.result.home.domaines_activite_droite || []"
                :images="data.result.home.domaines_images || []"
              />
            </div>
          </StyleBlock>
        </div>
      </div>

      <!-- Articles Home  -->
      <AppHomeArticleCarousel :articles="articlesHome" variant="white" />
    </template>

    <!-- page d'erreur -->
    <template v-else>
      <AppError />
    </template>
  </main>
</template>


<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, watch, nextTick, computed } from 'vue'

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
      domaines_titre: string
      domaines_activite_gauche: any[]
      domaines_activite_droite: any[]
      domaines_images: CMS_API_ImageObject[]
    },
    equipe: {
      profils_list: Array<{
        fullname: string
        email: string
        photo: CMS_API_PhotoEquipe
      }>
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

          domaines_titre: 'page.domaines_titre.value',
          domaines_activite_gauche: 'page.domaines_activite_gauche.toBlocks.toArray',
          domaines_activite_droite: 'page.domaines_activite_droite.toBlocks.toArray',
          domaines_images: {
            query: 'page.files',
            select: {
              uuid: 'file.uuid',
              url: 'file.url',
              tiny: 'file.resize(50, null, 10)',
              small: 'file.resize(500)',
              reg: 'file.resize(1280)',
              large: 'file.resize(1920)',
              xxl: 'file.resize(2500)',
              alt: 'file.alt.value'
            }
          },

        }
      },

      equipe: {
        query: "site.find('equipe')",
        select: {
          profils_list: {
            query: "page.profils_list.toStructure()",
            select: {
              fullname: true,
              email: true,
              photo: {
                query: "structureItem.photo.toFile()",
                select: {
                  alt: true,
                  tiny: "file.resize(50, null, 10)",
                  small: "file.resize(500)",
                  reg: "file.resize(1280)",
                  large: "file.resize(1920)",
                  xxl: "file.resize(2500)"
                }
              }
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
})

const articlesAll = computed(() => data.value?.result.actualites.articles || [])
const articlesHero = computed(() => articlesAll.value.slice(0, 2))
const articlesHome = computed(() => articlesAll.value.slice(0, 5))

const expandedCards = ref({
  photo: false,
  equipe: false
})

// 👉 Ajout scroll automatique vers ancre si route.hash existe
function scrollToHash(hash: string) {
  if (!hash) return

  // Ouvre la carte équipe si le hash correspond
  if (hash === '#equipe') {
    expandedCards.value.equipe = true
  }

  window.setTimeout(() => {
    const el = document.querySelector(hash)
    if (el) {
      console.log(hash)
      el.scrollIntoView({ behavior: 'smooth' })
    }
  },500)
}

// Appeler scrollToHash après l'initialisation
onMounted(() => {
  scrollToHash(route.hash)
})
</script>

<style lang="scss" scoped>
.stacked-section {
  position: relative;
}

.stacked-card {
  position: relative;
  width: 100%;
  max-height: 200px;
  overflow: hidden;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  margin-bottom: -50px;

  @media (max-width: 768px) {
    margin-bottom: -100px;
  }

  &.expanded {
    max-height: 5000px;
    margin-bottom: 0;
  }
}
</style>

