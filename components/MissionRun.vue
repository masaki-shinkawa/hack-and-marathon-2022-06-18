<template>
  <div class="n-container">
    <Labels main="今月の目標距離" :sub="monthlyMissionLabel" />

    <template v-if="!isComplete">
      <Labels main="今日の目的地" />
      <!-- <Labels main="今日の目的地" sub="東京都港区芝公園４丁目２−８" info="推定移動距離 4km" /> -->
    </template>
    <span v-else class="f-xl bold">達成！！</span>

    <div id="map" class="map mb-8"></div>

    <template v-if="!isComplete">
      <v-btn class="text-h6 bold" large block rounded color="primary" @click="check">到着</v-btn>
      <v-btn class="text-h6 mt-2 bold bg-white" large block rounded outlined color="primary" @click="end">
        諦める
      </v-btn>
    </template>
    <template v-else>
      <v-btn v-if="!isMissionReturn" class="text-h6 bold" large block rounded color="primary" @click="missionReturn">
        帰りも歩く</v-btn>
      <v-btn class="text-h6 mt-2 bold bg-white" large block rounded outlined color="primary" @click="toTop">
        トップに戻る
      </v-btn>
    </template>

    <v-snackbar v-model="snackbar" :timeout="3000">
      目的地から離れています。
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { MonthlyMissionResponse } from '~/types/apiTypes'

@Component
export default class MissionRun extends Vue {
  map?: google.maps.Map
  directionsService?: google.maps.DirectionsService
  directionsRenderer?: google.maps.DirectionsRenderer
  snackbar: boolean = false

  async mounted() {
    const mapDom = document.getElementById("map")
    const geolocation = this.$store.state.geolocation as GeolocationPosition
    const { latitude: lat, longitude: lng } = geolocation.coords

    const mapOptions = {
      center: { lat, lng },
      zoom: 15,
    };
    this.directionsService = new this.$google.maps.DirectionsService()
    this.directionsRenderer = new this.$google.maps.DirectionsRenderer()

    const map = new google.maps.Map(mapDom!, mapOptions)
    this.directionsRenderer.setMap(map)
    await this.setRoute({ lat, lng })
  }

  async setRoute({ lat, lng }: any) {
    if (!this.directionsService || !this.directionsRenderer) return
    const request: google.maps.DirectionsRequest = {
      origin: { lat, lng },
      destination: {
        lat: this.$store.state.destination.latitude,
        lng: this.$store.state.destination.longitude
      },
      travelMode: google.maps.TravelMode.WALKING
    }

    const directions = await this.directionsService.route(request)
    this.directionsRenderer.setDirections(directions)
  }

  async check() {
    // TODO: 現在位置情報を送る
    await this.$store.dispatch('achievementMission')
    if (!this.$store.state.isComplete) {
      this.snackbar = true
    }
  }

  end() {
    // 諦めるAPI投げる
    this.$store.dispatch('giveUp')
  }

  async missionReturn() {
    const geolocation = await this.$geolocation()
    this.$store.commit('setGeolocation', geolocation)
    // mission_return APIを投げる
    await this.$store.dispatch('missionReturn')
    await this.setRoute({
      lat: geolocation.coords.latitude,
      lng: geolocation.coords.longitude
    })
  }

  toTop() {
    this.$store.commit("setInitialize")
  }

  toKiloMetre(metre: number) {
    return (metre / 1000).toFixed(1)
  }

  get monthlyMission(): MonthlyMissionResponse {
    return this.$store.state.monthlyMission
  }

  get monthlyMissionLabel(): string {
    if (!this.monthlyMission.response) return ""
    return `${this.toKiloMetre(this.monthlyMission.response.currentDistance)}km / ${this.toKiloMetre(this.monthlyMission.response.targetDistance)}km`
  }

  get isComplete() {
    return this.$store.state.isComplete
  }

  get isMissionReturn() {
    return this.$store.state.isMissionReturn
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

.map {
  width: 100%;
  height: 240px;
  display: absolute;
}
</style>
