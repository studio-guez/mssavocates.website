<template>
    <section class="v-app-contact">
        <h2>Coordonnées de l’étude</h2>
        <h3>{{ v_app_contact_data.etude_nom }}</h3>
        <h3>{{ v_app_contact_data.etude_email }}</h3>
        <h3>{{ v_app_contact_data.etude_tel }}</h3>

        <section v-if="v_app_contact_data?.membres">
            <h2>Membres de l’étude</h2>
            <ul>
                <li v-for="(m, i) in v_app_contact_data.membres" :key="i">
                    <strong>{{ m.nom }}</strong><br />
                    <a :href="`mailto:${m.email}`">{{ m.email }}</a>
                </li>
            </ul>
        </section>

        <div>
            <h2>Adresse & image</h2>
            {{ v_app_contact_data.adresse }}
        </div>
    </section>
</template>



<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
    v_app_contact_data: CMS_API_contact
}>()
</script>





<style lang="scss" scoped>
.v-app-hero {}
</style>