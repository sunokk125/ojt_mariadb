<template>
    <div id="login_div">
        <h1>OJT 로그인</h1>
        <div id="input_div">
            <input type="text" class="input_id" v-model="userId" placeholder="Enter ID"/>
        </div>
        <div id="input_div">
            <input type="password" class="input_pw" v-model="userPW" placeholder="Enter Password"/>
        </div>
        <router-link :to="{ name: 'signUp' }">회원가입</router-link>
        <div id="input_div"><input type="button" v-on:click="login()" class="btnLogin" value="로그인"/>
        </div>
    </div>
</template>
<script>

import axios from "axios";

export default {
  name: "Login",
  data: () => ({
    userId: "",
    userPW: "",
    token: ""
  }),
  methods: {
    back() {
      history.back();
    },
    async login() {
      this.token = undefined;
      try {
        const res = await axios.post("http://localhost:3000/graphql", {
          query: `
            mutation{
              login(userId:"${this.userId}",password:"${this.userPW}"){
                token
                user{
                  No
                  Company
                  UserId
                  UserName
                }
              }
            }
          `
        });


        this.token = res.data.data.login.token;
        this.$store.dispatch('LOGIN', res.data.data.login);

        console.log(res.data.data.login);

        axios.defaults.headers.common['x-access-token'] = res.data.data.accessToken;

        this.$router.push({
            path:'/main'
        })
      } catch (error) {
        alert("wrong login : " + error);
        return;
      }
    }
  }
};
</script>
<style scoped>

</style>