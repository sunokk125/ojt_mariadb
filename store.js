//store.js
// Vuex 안에서는 /src/main.js에서 import한 것이 안먹힌다. 여기서 다시하고 import명으로 실행해야 한다.
import Vue from 'vue'
import Vuex from 'vuex'
import CryptoJS from 'crypto-js'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

Vue.use(Vuex);
Vue.prototype.$http = axios



export const store = new Vuex.Store({
  state: {
    // baseURI: "http://thinkpeople.iptime.org:39080",

    baseURI: 'http://thinkpeople.iptime.org:39080',
    serviceURI: 'http://192.168.0.101:9090',

    /* 입력 id/pw */
    id: 'ams_transcoder',
    password: '1234',
    /* REST API Server Login */
    // userAccount: "",
    // userPassword: "",
    // Authorization: '', // for token of header

    /* jwt */
    jwt: localStorage.getItem('t'),
    endpoints: {
      // obtainJWT: 'http://0.0.0.0:10000/auth/obtain_token',
      // refreshJWT: 'http://0.0.0.0:10000/auth/refresh_token'
      obtainJWT: '',
      refreshJWT: ''
    }
  },
  api: {

  },
  mutations: {
    updateToken(state, newToken) {
      localStorage.setItem('t', newToken);
      state.jwt = newToken;
      // console.log("updateToken: " + state.jwt);
      // console.log("decodeToken: " + jwt_decode(state.jwt));
    },
    removeToken(state) {
      localStorage.removeItem('t');
      state.jwt = null;
    }
  },
  actions: {
    // obtainToken(username, password){
    // obtainToken(state, payload) {
      obtainToken() {


      console.log("obtainToken>>> arg id; " + this.state.id, ", pw: " + this.state.password);

      let req_payload = {
        // userAccount: payload.id,
        // userPassword: CryptoJS.SHA256(payload.password) + ''
        userAccount: this.state.id,
        userPassword: CryptoJS.SHA256(this.state.password) + '' // make string type
      }

      this.state.endpoints.obtainJWT = this.state.baseURI + '/ams/1.0/transcoderSystem/transcoder/login';
      this.state.endpoints.refreshJWT = this.state.endpoints.obtainJWT;

      // console.log('obtainJWT: ' + this.state.endpoints.obtainJWT);
      // console.log('req_payload: ' + req_payload);

      // Vue.axios.post(this.state.endpoints.obtainJWT, req_payload,{
      // this.$http.post(this.state.endpoints.$obtainJWT, this.req_payload
      axios.post(this.state.endpoints.obtainJWT, req_payload, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': this.state.jwt
          }
        })

        .then((response) => {
          // console.log(response.data);
          this.commit('updateToken', response.data.token);
          this.dispatch('inspectToken');
        })
        .catch((error) => {
          console.log(error);
        })
    },

    refreshToken() {
      const payload = {
        token: this.state.jwt
      }
      axios.post(this.state.endpoints.refreshJWT, payload)
        // this.$http.post(this.state.endpoints.refreshJWT, payload)

        .then((response) => {
          this.commit('updateToken', response.data.token);

        })
        .catch((error) => {
          console.log(error)
        })
    },

    inspectToken() {
      const token = this.state.jwt;
      if (token) {
        const decoded = jwt_decode(token);
        // console.log("decoded: " + decoded);
        const exp = decoded.exp
        const orig_iat = decoded.orig_iat

        console.log("inspectToken>>> Date.now(): "+Date.now()/1000+", exp: "+exp+", orig_iat: "+orig_iat);
        if((Date.now()/1000) > exp ) this.dispatch('obtainToken');

        // if ((Date.now() / 1000) - exp < 1800 && (Date.now() / 1000) - orig_iat < 628200) {
        //   // under 30 mins &&
        //   // this.dispatch('refreshToken')
        //   this.dispath('obtainToken')
        // } else if ((Date.now() / 1000) - exp < 1800) {
        //   // DO NOTHING, DO NOT REFRESH
        // } else {
        //   // PROMPT USER TO RE-LOGIN
        // }
      }
      else this.dispatch('obtainToken');
    }
  }
})
