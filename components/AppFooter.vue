<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-block">
        <h3>Adresse</h3>
        <p v-html="v_app_footer_data.adresse" />
      </div>
      <div class="footer-block">
        <h3>Accès</h3>
        <p v-html="v_app_footer_data.acces" />
      </div>
      <div class="footer-block">
        <h3>Contact</h3>
        <p v-html="v_app_footer_data.contact" />
      </div>
      <div class="footer-block">
        <h3>Accueil téléphonique</h3>
        <p v-html="v_app_footer_data.accueil" />
      </div>
    </div>
  </footer>
</template>


<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  v_app_footer_data: CMS_API_Footer
}>()
</script>





<style lang="scss" scoped >
.v-app-hero {
}
</style>