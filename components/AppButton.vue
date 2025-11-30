<template>
<component
  :is="linkTag"
  v-bind="linkAttrs"
  class="v-app-button"
  :class="[variant, { 'is-selected': selected }]"
  @click="$emit('click')"
>

    <slot>{{ label }}</slot>
  </component>
 </template>


 <script setup lang="ts">
 import { defineProps, defineEmits, computed } from 'vue'
 import { NuxtLink } from '#components'

 const props = defineProps<{
   label?: string
   selected?: boolean
   to?: string
   href?: string
  variant?: 'outlined' | 'outlined-white' | 'cta-actus' | 'outlined-black'
 }>()

 defineEmits<{
   (e: 'click'): void
 }>()

 const linkTag = computed(() => {
   if (props.to) return NuxtLink
   if (props.href) return 'a'
   return 'button'
 })

 const linkAttrs = computed(() => {
   if (linkTag.value === NuxtLink) {
     return { to: props.to }
   } else if (linkTag.value === 'a') {
     return { href: props.href, target: '_blank', rel: 'noopener' }
   } else {
     return {}
   }
 })
 </script>


 <style scoped lang="scss">
 .v-app-button {
  border-radius: var(--radius-full);
  padding: var(--space-xs) var(--space-m);
  min-width: 2rem;
  font-family: var(--font-Inter), sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border: 0.05rem solid;
  box-shadow: none;
 }


 .v-app-button.outlined {
  background: transparent;
  border-color: var(--color-pink);
  color: var(--color-pink);


  &:hover {
    background: var(--color-pink);
    color: var(--color-white);
  }
 }


 .v-app-button.outlined-white {
   background: transparent;
    color: var(--color-white);


  &:hover {

     background: var(--color-white);
  border-color: var(--color-white);
  color: var(--color-pink);
  }
 }


 .v-app-button.is-selected {
  background: var(--color-pink);
  color: var(--color-white);
  border-color: var(--color-white);
 }

 .v-app-button.cta-actus {
  font-size: 1.2rem;
  font-weight: 500;
  padding: 0.5rem 2rem;
  background-color: transparent;
  color: var(--color-white);
  border: 0.05rem solid var(--color-white);

  &:hover {
    background-color: var(--color-white);
    color: var(--color-pink);
  }
}

.v-app-button.outlined-black {
  background-color: var(--color-white);
  color: #000;
  border-color: #000;
  border-radius: var(--radius-s);

  &:hover {
    background-color: #000;
    color: var(--color-white);
  }
}
 </style>



