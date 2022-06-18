<template>
  <img class="vuetify-logo" alt="Vuetify Logo" :src="src" />
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class VuetifyLogo extends Vue {
  get src() {
    return `${process.env.BASE_URL}/vuetify-logo.svg`
  }
}</script>

<style>
.vuetify-logo {
  height: 180px;
  width: 180px;
  transform: rotateY(560deg);
  animation: turn 3.5s ease-out forwards 1s;
}

@keyframes turn {
  100% {
    transform: rotateY(0deg);
  }
}
</style>
