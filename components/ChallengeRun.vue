<template>
  <div class="n-container">
    <Labels main="今月の目標距離" sub="50.3km / 100km" />

    <template v-if="isComplete">
      <Labels main="今月の目的地" sub="東京都港区芝公園４丁目２−８" info="推定移動距離 4km" />
    </template>
    <span v-else class="f-xl bold">4km 達成！！</span>

    <div id="map" class="map mb-8"></div>

    <template v-if="isComplete">
      <v-btn class="text-h6 bold" large block rounded color="primary" @click="check">ミッション開始</v-btn>
      <v-btn class="text-h6 mt-2 bold bg-white" large block rounded outlined color="primary" @click="end">
        諦める
      </v-btn>
    </template>
    <template v-else>
      <v-btn class="text-h6 bold" large block rounded color="primary" @click="missionReturn">帰りも歩く</v-btn>
      <v-btn class="text-h6 mt-2 bold bg-white" large block rounded outlined color="primary" @click="toTop">
        トップに戻る
      </v-btn>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class ChallengeRun extends Vue {
  map?: google.maps.Map

  mounted() {
    const mapDom = document.getElementById("map")
    const mapOptions = {
      center: {
        lat: 0,
        lng: 0
      },
      zoom: 4
    };
    // eslint-disable-next-line no-new
    new google.maps.Map(mapDom!, mapOptions)
  }

  check() { }

  end() { }

  missionReturn() { }

  toTop() { }

  get isComplete() {
    return false
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
