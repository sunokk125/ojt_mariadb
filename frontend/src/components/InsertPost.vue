<template>
    <div id="wrap">
        <Header></Header>
        <div id="body">
            <h2>게시글 작성</h2>
            <div id="input_div">
                <table>
                    <tr>
                        <td>Title</td>
                        <td>
                            <input type="text" placeholder="제목을 입력해주세요" v-model="createData['Title']"/>
                        </td>
                    </tr>
                    
                    <tr>
                        <td>Content</td>
                        <td>
                            <textarea placeholder="내용을 입력해주세요" v-model="createData['Contents']"></textarea>
                        </td>
                    </tr>
                </table>
                
            </div>
            
            <div id="btn_div">
                <v-btn v-on:click="post()"><input type="button" class="insBtn" value="등록"></v-btn>
                <v-btn v-on:click="back()"><input type="button" class="backBtn" value="돌아가기"></v-btn>
            </div>
        </div>
    </div>
    
</template>
<script>
import Header from './Header.vue';
import axios from 'axios';
export default {
    components : {
        Header
    },
    data(){
        return{
            No:"",
            createData:{
                "Title":null,
                "Contents":null
            }
        }
    },
    created(){
        this.getDecodeUser();
    },
    methods: {
        back(){
            history.back();
        },
        async post(){
            try {
                console.log(this.No);
                console.log(`
                        mutation{
                            createPost(
                                Title:"${this.createData['Title']}",
                                Contents:"${this.createData['Contents']}",
                                Writer:${this.No},
                            ){
                                resultCount
                            }
                        }`);

                await axios.post(
                    'http://localhost:3000/graphql',{
                    query: `
                        mutation{
                            createPost(
                                Title:"${this.createData['Title']}",
                                Contents:"${this.createData['Contents']}",
                                Writer:${this.No},
                            ){
                                resultCount
                            }
                        }`
                    }
                );
                alert(`post created! `);
                this.$router.push({
                    path:'/main'
                })
            } catch (error) {
                alert(`createUserData Funtion error : ${error}`);
                console.log(`createUserData Funtion error : ${error}`);
                throw error;
            }
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
            this.No = res.data.data.getDecodeToken.No;
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
    #body{
        width: 60%;
        display: inline-block;
    }
    
    .insBtn{
        background-color:rgb(52, 152, 219) ;
        width: 80px;
        height: 30px;
        color: white;
        border: none;
        border-radius: 5px;
        margin-right:40px ;
    }
    .backBtn{
        background-color:#cccccc ;
        width: 80px;
        height: 30px;
        border: none;
        border-radius: 5px;
        margin-left: 40px;
    }
    
</style>