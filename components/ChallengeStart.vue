<template>
  <div class="n-container">
    <Labels main="今月の目標距離" sub="50.3km / 100km" />
    <Labels main="今日の目標距離" sub="16.3km / 10km" status="failed" />
    <span class="f-l bold">メンバーの達成状況</span>
    <div class="memberCardList">
      <MemberCard name="aaaaa" :status="1" :metre="1400"></MemberCard>
      <MemberCard name="aaaaa" :status="2" :metre="16000"></MemberCard>
      <MemberCard name="aaaaa" :status="3" :metre="18000"></MemberCard>
    </div>
    <span class="f-l bold mt-4">目標距離</span>
    <v-text-field v-model="targetDistance" type="number" class="full-width" solo label="目標距離" clearable></v-text-field>
    <v-btn class="text-h6 bold" large block rounded color="primary" :loading="isGettingGeolocation" @click="start">
      ミッション開始</v-btn>
    <v-btn class="text-h6 mt-2 bold bg-white" large block rounded outlined color="primary" @click="end">
      今日はここまで
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class ChallengeStart extends Vue {
  targetDistance: number | null = null

  isGettingGeolocation = false

  async start() {
    this.isGettingGeolocation = true
    const geolocation = await this.$geolocation()
    this.isGettingGeolocation = false
    console.log(geolocation);
  }

  end() { }
}
</script>

<style scoped lang="scss">
.n-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.memberCardList {
  width: 100%;
  gap: 8px;
  display: flex;
  flex-direction: column;
}

.full-width {
  width: 100%
}
</style>
