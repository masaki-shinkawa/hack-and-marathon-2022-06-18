<template>
  <div class="container">
    <img src="@/assets/img/www.svg" alt="" class="logo">
    <span class="f-xl logo__title">Work With Walk</span>
    <div class="fieldset">
      <v-text-field v-model="userName" solo label="ユーザー名" clearable></v-text-field>
      <v-text-field v-model="password" solo label="パスワード" clearable></v-text-field>
      <v-btn rounded color="primary" @click="login">ログイン</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Login extends Vue {
  userName: string = ""
  password: string = ""

  login() {
    console.log(this.userName, this.password);
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  width: 244px;
  height: 244px;
}

.logo__title {
  font-weight: bold;
}

.fieldset {
  margin-top: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
