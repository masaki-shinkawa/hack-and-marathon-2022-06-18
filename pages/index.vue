<template>
  <Login v-if="isLogin"></Login>
  <ChallengeStart v-else-if="isChallenge"></ChallengeStart>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Index extends Vue {
  get isLogin() {
    return this.$store.state.bearer
  }

  get isChallenge() {
    return true
  }
}
</script>

