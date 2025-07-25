<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-block">
        <h4>Adresse</h4>
        <div class="body-2" v-html="v_app_footer_data.adresse" />
      </div>
 
 
      <div class="footer-block">
        <h4>Accès</h4>
        <div class="body-2" v-html="v_app_footer_data.acces" />
      </div>
 
 
      <div class="footer-block">
        <h4>Contact</h4>
        <div class="body-2" v-html="v_app_footer_data.contact" />
      </div>
 
 
      <div class="footer-block">
        <h4>Accueil téléphonique</h4>
        <div class="body-2" v-html="v_app_footer_data.accueil" />
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
 .app-footer {
  background-color: var(--color-white);
  padding-block: var(--space-l);
  border: 2px solid var(--color-pink);
  border-radius: var(--radius-l) var(--radius-l) 0 0;
 }
 
 
 .footer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-l);
  max-width: var(--container-width);
  margin-inline: auto;
  padding-inline: var(--space-m);
  box-sizing: border-box;
 }
 
 
 .footer-block {
  flex: 1 1 calc(25% - var(--space-xl));
  min-width: 220px;
 }
 
 
 .footer-block h4 {
  text-transform: uppercase;
  margin-bottom: var(--space-s);
 }
 
 
 .footer-block .body-2 {
  margin: 0;
 }
 
 
 /* Responsive : stack en colonne sur mobile */
 @media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    gap: var(--space-l);
  }
 
 
  .footer-block {
    width: 100%;
  }
 }
 </style >
 
 