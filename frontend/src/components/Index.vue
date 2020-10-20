<template>
    <div id="wrap">
        <div>
            <Header></Header>
        </div>
        <div id="body">
            <table>
                <tr>
                    <td class="no_1st">No</td>
                    <td class="title_1st">Title</td>
                    <td class="writer_1st">Writer</td>
                    <td class="date_1st">Date</td>
                    <td class="count_1st">Count</td>
                </tr>
                <tr v-for="(post,index) in posts" :key="index">
                        <td class="no">{{index+1}}</td>
                        <td class="title">
                            <router-link :to="{'path':'/detailPost/'+post.No}">{{post.Title}}</router-link>
                        </td>
                        <td class="writer">{{post.Writer}}</td>
                        <td class="date">{{post.CreatedDate}}</td>
                        <td class="count">{{post.Counter}}</td>
                </tr>
            </table>
            <div id="insertPost">
                <router-link :to="{name:'insertPost'}"><input type="button" value="글쓰기" class="post"></router-link>
            </div>
            <div id="pageNum">
                <router-link :to="{name : 'main'}">
                    <div id="numBox"><span>1</span></div>
                </router-link>
            </div>
        </div>
    </div>
    
</template>
<script>
import store from '../../store/store.js';
import Header from './Header.vue';
import axios from 'axios'

export default {
    
    components : {
        Header
    },
    created(){
        this.getDecodeCompany();
    },

    data(){
        return{
            Company:"",
            posts:[]
        }
    },

  methods: {
    async getPost(){
        try {
            console.log(`
                    query{
                        getPostsList(Company:`+this.Company+`){
                            No
                            Title
                            Contents
                            Writer
                            Counter
                            CreatedDate
                        }
                    }
                `);
            const res =await axios.post('http://localhost:3000/graphql',{
                query:`
                    query{
                        getPostsList(Company:`+this.Company+`){
                            No
                            Title
                            Contents
                            Writer
                            Counter
                            CreatedDate
                        }
                    }
                `
            });
            this.posts = res.data.data.getPostsList;
            console.log(store.state.token);
        } catch (err) {
            console.log("getPostsList err"+err);
        }
    },
    async getDecodeCompany(){
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
            this.Company = res.data.data.getDecodeToken.Company;

            this.getPost();
  
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
    /*body*/
    #body{
        width: 60%;
        display: inline-block;
        text-align: center;
    }

    #insertPost{
        height: 50px;
    }

    .post{
        float: right;
        background-color:#cccccc ;
        width: 80px;
        height: 30px;
        border: none;
        border-radius: 5px;
        margin-left: 40px;
    }

    #numBox{
        display: inline-block;
        width: 40px;
        height: 40px;
        line-height: 40px;
        background-color: #cccccc;
    }
    
</style>