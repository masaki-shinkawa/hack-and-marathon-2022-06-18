<template>
  <div class="n-container">
    <Labels main="今月の目標距離" :sub="monthlyMissionLabel" />
    <Labels main="今日の目標距離" :sub="dailyMissionLabel" :status="dailyMissionStatus" />
    <span class="f-l bold">メンバーの達成状況</span>
    <div class="memberCardList">
      <MemberCard v-for="member in memberStatus" :key="member.userId" :name="member.name" :status="member.status"
        :metre="member.currentDistance">
      </MemberCard>
    </div>

    <template v-if="!isEnd">
      <span class="f-l bold mt-4">目標距離</span>
      <v-text-field v-model="targetDistance" suffix="km" type="number" class="font-color-black full-width" solo
        label="目標距離" clearable>
      </v-text-field>
      <v-btn class="text-h6 bold" large block rounded color="primary" :loading="isGettingGeolocation" @click="start">
        ミッション開始</v-btn>
      <v-btn class="text-h6 mt-2 bold bg-white" large block rounded outlined color="primary" @click="end">
        今日はここまで
      </v-btn>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { DailyMissionResponse, MonthlyMissionResponse } from '~/types/apiTypes'

@Component
export default class MissionStart extends Vue {
  targetDistance: number | null = null
  isGettingGeolocation = false

  fetch() {
    this.$store.dispatch('dailyMission')
    this.$store.dispatch('monthlyMission')
  }

  async start() {
    if (!this.targetDistance || this.targetDistance < 1) return
    this.isGettingGeolocation = true
    const geolocation = await this.$geolocation()
    this.$store.commit('setGeolocation', geolocation)
    // 位置情報を送信
    await this.$store.dispatch('missionStart', this.targetDistance * 1000)
    this.$store.commit('setIsMissionStarted', true)
    this.isGettingGeolocation = false
  }

  end() {
    // 今日はここまでAPI
    this.$store.commit("setIsEnd", true)
    // 
  }

  toKiloMetre(metre: number) {
    return (metre / 1000).toFixed(1)
  }

  get isEnd() {
    return this.$store.state.isEnd
  }

  get dailyMission(): DailyMissionResponse {
    return this.$store.state.dailyMission
  }

  get monthlyMission(): MonthlyMissionResponse {
    return this.$store.state.monthlyMission
  }

  get memberStatus() {
    return this.dailyMission?.response?.memberStatus ?? []
  }

  get monthlyMissionLabel(): string {
    if (!this.monthlyMission.response) return ""
    return `${this.toKiloMetre(this.monthlyMission.response.currentDistance)}km / ${this.toKiloMetre(this.monthlyMission.response.targetDistance)}km`
  }

  get dailyMissionLabel(): string {
    if (!this.dailyMission.response) return ""
    return `${this.toKiloMetre(this.dailyMission.response.currentDistance)}km / ${this.toKiloMetre(this.dailyMission.response.targetDistance)}km`
  }

  get dailyMissionStatus() {
    if (!this.dailyMission.response) return ""
    if (this.dailyMission.response.currentDistance >= this.dailyMission.response.targetDistance) return "success"
    return "default"
  }
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
