<template>
    <main>
    <StyleBlock :withDivider="true">
    <AppProfilsEquipe
  :profils="(data?.result?.profils_list as CMS_API_profils['profils_list']) || []"
/>
</StyleBlock>

    </main>
  </template>

<script setup lang="ts">

type FetchData = CMS_API_Response & {
    result: CMS_API_profils
}

// -----------------------------
//   Données équipes
// -----------------------------

const { data, status } = await useFetch<FetchData>('/api/CMS_KQLRequest', {
    lazy: true,
    method: 'POST',
    body: {
        query: "site.find('equipe')",
        select: {
            //   title: true,
            //   slug: true,
            profils_list: {
                query: "page.profils_list.toStructure()",
                select: {
                    fullname: true,
                    email: true,
                    description: true,
                    photo: {
                        query: "structureItem.photo.toFile()",
                        select: {
                            alt: true,
                            tiny: "file.resize(100)",
                            small: "file.resize(400)",
                            reg: "file.resize(800)",
                            large: "file.resize(1200)",
                            xxl: "file.resize(2000)"
                        }
                    }
                }
            }
        }
    }
})

</script>
