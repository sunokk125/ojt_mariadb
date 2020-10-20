import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        accessToken : null,
        userNo:"",
        userName:"",
        company:""
    },
    getter : {
        
    },
    mutations : {
        LOGIN(state,login){
            state.accessToken = login.token;
            state.userNo=login.No;
            state.userName=login.Name;
            state.company=login.Company;
            

            localStorage.accessToken = login.token
            
            const enhanceAccessToeken = () => {
                const {accessToken} = localStorage
                if (!accessToken) return
                axios.defaults.headers.common['Authorization'] = `${accessToken}`;
              }
            enhanceAccessToeken()
        },

        LOGOUT(state) {
            state.accessToken = null
            delete localStorage.accessToken
        }
    },

    actions: {
        LOGIN ({commit},token) {
            commit('LOGIN',token);
            axios.defaults.headers.common['Authorization'] = `${token}`;
        },
        LOGOUT ({commit}){
            axios.defaults.headers.common['Authorization'] = undefined
            commit('LOGOUT');
        }
    }

    
});