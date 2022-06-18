<template>
  <Login v-if="!isLogin"></Login>
  <ChallengeStart v-else-if="isChallengeStart"></ChallengeStart>
  <ChallengeRun v-else-if="isChallengeRun"></ChallengeRun>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Index extends Vue {
  get isLogin() {
    return this.$store.state.bearer
  }

  get isChallengeStart() {
    return true
  }

  get isChallengeRun() {
    return true
  }
}
</script>
