<template>
    <div id="wrap">
        <Header></Header>
        <div id="body">
            <h2>게시글</h2>
            <div id="input_div">
                <table>
                    <tr>
                        <td>Writer</td>
                        <td>
                            {{post.Writer}}
                        </td>
                    </tr>
                    <tr>
                        <td>Title</td>
                        <td v-if="this.updateMode">
                            <input type="text">
                        </td>
                        <td v-else>
                            {{post.Title}}
                        </td>
                    </tr>
                    
                    <tr>
                        <td>Content</td>
                        <td v-if="this.updateMode">
                            <textarea name="" id="" cols="30" rows="10"></textarea>
                        </td>
                        <td v-else>
                            {{post.Contents}}
                        </td>
                    </tr>
                </table>
                
            </div>
            
            <div id="btn_div">
                    <v-btn v-on:click="savePost()" v-if="this.updateMode">
                        <input type="button" class="insBtn" value="저장">
                    </v-btn>
                    <v-btn v-on:click="updatePost()" v-else>
                        <input type="button" class="insBtn" value="수정">
                    </v-btn>
                    <v-btn v-on:click="backPost()" v-if="this.updateMode">
                        <input type="button" class="backBtn" value="취소">
                    </v-btn>
                    <v-btn v-on:click="deletePost()" v-else>
                        <input type="button" class="backBtn" value="삭제">
                    </v-btn>
                <v-btn v-on:click="back()"><input type="button" class="backBtn" value="목록"></v-btn>
            </div>
            <div id="comentBox">
                <h3>댓글</h3>
                <table>
                    <tr>
                        <td>
                            writer
                        </td>
                        
                        <td>
                            coment
                        </td>
                        
                        <td>
                            date
                        </td>
                        
                        <td>
                            <table>
                                <tr>
                                    <td>
                                        c_writer
                                    </td>
                                    
                                    <td>
                                        c_coment
                                    </td>
                                    
                                    <td>
                                        c_date
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
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
    created(){
        this.readPost();
    },
    data() {
        const postId = this.$route.params.postId
        console.log(postId);
        return {
            Company:"",
            postId:postId,
            post:{
                Title:"",
                Contents:"",
                Writer:""
            },
            updateMode:false,
        }
    },
    methods : {
        back(){
            history.back();
        },
        async readPost(){
            try {
                console.log(`
                        query{
                            readPost(
                                No:${this.postId}
                            ){
                                Title
                                Writer
                                Contents
                            }
                        }`);
                const res = await axios.post('http://localhost:3000/graphql',{
                    query: `
                        query{
                            readPost(
                                No:${this.postId}
                            ){
                                Title
                                Writer
                                Contents
                            }
                        }`
                });
                console.log(res.data.data.readPost[0]);
                this.post = res.data.data.readPost[0];
                
            } catch (err) {
                console.log( "readpostError" + err)
                throw err;       
            }
            
        },
        async updatePost(){
            this.updateMode=true;
        },
        async backPost(){
            this.updateMode=false;
        },
        async deletePost(){
            console.log("deletpost");
            await axios.post('http://localhost:3000/graphql',{
                    query: `
                        mutation{
                            delete(
                                No:${this.postId}
                            ){
                                UserUpdateResult
                            }
                        }`
                });
            this.$router.push({
                path:'/main'
            });
        },
        async savePost(){
            console.log("savepost");
            await axios.post('http://localhost:3000/graphql',{
                    query: `
                        mutation{
                            updatePost(
                                No:${this.postId}
                            ){
                                UserUpdateResult
                            }
                        }`
                });
            this.$router.push({
                path:'/main'
            });
        }
        
        
    
    }
}
</script>
<style scoped>
    #wrap{
        text-align: center;
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