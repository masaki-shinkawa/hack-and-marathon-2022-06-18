<template>
  <Login v-if="!isLogin"></Login>
  <MissionStart v-else-if="isMissionStart"></MissionStart>
  <MissionRun v-else-if="isMissionRun"></MissionRun>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Index extends Vue {
  async asyncData({ store, $geolocation }: any) {
    const geolocation = await $geolocation()
    store.commit('setGeolocation', geolocation)
    await store.dispatch('initialize')
  }

  get isLogin() {
    return this.$store.state.bearer
  }

  get isMissionStart() {
    return !this.$store.state.isMissionStarted
  }

  get isMissionRun() {
    return this.$store.state.isMissionStarted
  }
}
</script>
