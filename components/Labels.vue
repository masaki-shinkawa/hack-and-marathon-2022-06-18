<template>
  <div class="n-container">
    <span v-if="main" class="f-l bold">{{ main }}</span>
    <span v-if="sub" :class="`f-m n-${status}`">{{ sub }}</span>
    <span v-if="info" class="f-m">{{ info }}</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

type Status = "default" | "success" | "failed"

@Component
export default class Labels extends Vue {
  @Prop({ type: String, default: "" })
  main!: string

  @Prop({ type: String, default: "" })
  sub!: string

  @Prop({ type: String, default: "" })
  info!: string

  @Prop({ type: String, default: "" })
  status!: Status
}
</script>

<style scoped lang="scss">
.n-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0px;
}

.n-success {
  color: #A0AAFF;
}

.n-failed {
  color: #FFA0AA;
}
</style>
