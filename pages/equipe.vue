<template>
    <main>
        <div>
            <h2>Profils</h2>

            <div v-for="profil in data?.result?.profils_list" :key="profil.email">
                <h3>{{ profil.fullname }}</h3>
                <img :src="profil.photo.small.url" :alt="profil.photo.alt || profil.fullname" />
                <p v-html="profil.description"></p>
            </div>
        </div>
    </main>
</template>


<script setup lang="ts">

type FetchData = CMS_API_Response & {
    result: CMS_API_profils
}

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
