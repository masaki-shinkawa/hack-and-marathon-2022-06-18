<template>
  <div class="n-container">
    <img v-if="status === 1" class="n-icon" src="@/assets/img/human-male.png" />
    <img v-if="status === 2" class="n-icon" src="@/assets/img/run-fast.png" />
    <img v-if="status === 3" class="n-icon" src="@/assets/img/exit-run.png" />
    <span class="f-l name__label bold">{{ name }}</span>
    <div class="metre">
      <span class="f-l metre__label">{{ metre }}</span>
      <span class="f-s metre__unit">km</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class MemberCard extends Vue {
  @Prop({ type: Number, default: 0 })
  status!: number

  @Prop({ type: String, default: "" })
  name!: string

  @Prop({ type: Number, default: 0 })
  metre!: number
}
</script>

<style scoped lang="scss">
.n-container {
  display: flex;
  justify-content: center;
  flex-direction: row;
  background-color: white;
  border-radius: 12px;
  border-width: 2px;
  border-color: #6750A4;
  height: 64px;
  width: 100%;
}

.name__label {
  color: black;
  flex: 1;
}

.metre {
  background-color: #F0F0F0;
  width: 110px;
  height: 100%;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 8px;
}

.metre__label {
  color: black;
}

.metre__unit {
  color: black;
}

.n-icon {
  margin-left: 8px;
  margin-right: 8px;
  width: 36px;
  height: 36px;
}
</style>
