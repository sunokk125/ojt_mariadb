<template>
    <div id="header">
        <div>
        <h1>OJT 게시판</h1>
        <div id="menu">
            <ul>
                <router-link :to="{name:'main'}"><li>Home</li></router-link>
                <li>{{userName}} 님</li>
                <router-link :to="{name:'mypage'}"><li>MYPAGE</li></router-link>
                <li v-if="isAuthenticated" x-large v-on:click="logout()">LOGOUT</li>
            </ul>
        </div>
        </div>
    </div>
</template>
<script>

import store from '../../store/store.js';
import axios from 'axios'

export default {
    name:'Header',
    computed: {
    isAuthenticated: function() {
        console.log(localStorage);
      if(localStorage.accessToken) return true;
      else return false
    }
  },
    data(){
        return{
            userName:"",

        }
    },
    created(){
        this.getDecodeUser();
    },

  methods: {
    logout(){
      store.dispatch('LOGOUT');
      this.$router.push({
          path:'/'
      });
    },
    async getDecodeUser(){
        try{
            

            const token = localStorage.accessToken;

            console.log(`mutation{
                        getDecodeUser(token:`+token+`){
                            No
                            UserId
                            Company
                        }
                    }`);
            const res = await axios.post('http://localhost:3000/graphql',{
                query:`
                    mutation{
                        getDecodeToken(token:"`+token+`"){
                            No
                            UserId
                            Company
                        }
                    }
                `
            })
            this.userNo = res.data.data.getDecodeToken.No;
            this.userName = res.data.data.getDecodeToken.UserId;
            this.userCompany = res.data.data.getDecodeToken.Company;
        }catch (err) {
            console.log("getUser error : "+err);
        }

    }
  }
}
</script>
<style scoped>
    #wrap{
        text-align: center;
    }

    a{
        text-decoration: none;
    }
    /*header*/
    #header{
        display: inline-block;
        width: 60%;
    }
    #header h1{
        float: left;
    }
    #header ul {
        display:inline-block ;
        float: right;
    }
    #header ul li{
        display:inline-block ;
        margin-left: 50px;
    }
    
    
</style>