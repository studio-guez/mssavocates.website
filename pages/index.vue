<template>
  <main class="v-index">
    <template v-if="data">
      <template v-if="data.status === 'ok'">

        <!-- hero= texte + articles  -->
        <StyleBlock withDivider dividerPosition="leftSplit">
          <AppHero
            :v_app_hero_data="data.result.home.introduction[0]"
            :articles="articlesHero"
          />
        </StyleBlock>

        <!-- Articles Home  -->
        <AppHomeArticleCarousel :articles="articlesHome" variant="white" />

        <!-- équipe  -->
        <div id="equipe" data-satck-name="EQUIPE">
          <StyleBlock>
            <div class="container">
              <h2 class="light">ÉQUIPE</h2>

              <div class="flex flex-center" style="flex-wrap: wrap; gap: var(--space-xl);">
                <AppTeam
                  v-for="person in data.result.equipe"
                  :key="person.title"
                  :v_app_team_data="person"
                />
              </div>
            </div>
          </StyleBlock>
        </div>

        <!-- domaines d'activités  -->
        <div id="domaines" data-satck-name="Notre étude">
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




        <!-- photo équipe  -->
        <StyleBlock class="is-fill photo-equipe-block">
          <img
            :src="data.result.home.photo_equipe.xxl.url"
            :style="{ objectPosition: data.result.home.photo_equipe.focus || 'center' }"
            class="img-full"
          />
        </StyleBlock>
      </template>
      <!-- page d'erreur -->
      <template v-else>
        <AppError />
      </template>
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
      slug: string
      title: string
      email: string
      photo: CMS_API_PhotoEquipe
    }[],
    actualites: {
      title: string
      slug: string
      articles_hero: CMS_API_Article[]
      articles_carousel: CMS_API_Article[]
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
              xxl: 'file.resize(2500)',
              focus: 'file.focus'
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
        query: "site.find('equipe').children()",
        select: {
          title: true,
          email: true,
          slug: true,
          photo: {
            query: "page.photo.toFile()",
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
      },

      actualites: {
        query: `site.find("actualites")`,
        select: {
          title: true,
          slug: true,
          articles_hero: {
            query: 'page.children().listed().filterBy("show_in_hero", "true").sortBy("date", "desc").limit(2)',
            select: {
              main_title: true,
              date: true,
              resume: true,
              slug: true
            }
          },
          articles_carousel: {
            query: 'page.children().listed().sortBy("date", "desc").limit(5)',
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

const articlesHero = computed(() => {
  const heroArticles = data.value?.result.actualites.articles_hero || []
  const carouselArticles = data.value?.result.actualites.articles_carousel || []

  // Si on a moins de 2 articles hero, on complète avec les articles du carousel
  if (heroArticles.length < 2 && carouselArticles.length > 0) {
    const needed = 1 - heroArticles.length
    const additionalArticles = carouselArticles
      .filter(article => !heroArticles.some(hero => hero.slug === article.slug))
      .slice(0, needed)
    return [...heroArticles, ...additionalArticles]
  }

  return heroArticles
})

const articlesHome = computed(() => data.value?.result.actualites.articles_carousel || [])

// Signal que les données initiales sont chargées
const { setInitialDataLoaded } = useAppLoading()
watch(() => data.value, (newData) => {
  if ( newData ) {
    setInitialDataLoaded()
  }
}, { immediate: true })

// 👉 Ajout scroll automatique vers ancre si route.hash existe
function scrollToHash(hash: string) {
  if (!hash) return

  window.setTimeout(() => {
    const el = document.querySelector(hash)
    if (el) {
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
.v-index {
  padding-top: var(--space-xxl);
  padding-bottom: var(--space-xxl);
}

.photo-equipe-block {
  height: calc(100vh - 5.5rem);

  @media (max-width: 768px) {
    min-height: 400px;
  }
}
</style>

