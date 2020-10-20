<template>
    <div id="wrap">
        <Header></Header>
        <div id="body">
            <h2>게시글 수정</h2>
            <div id="input_div">
                <table>
                    <tr>
                        <td>Title</td>
                        <td>
                            <input type="text" placeholder="제목을 입력해주세요"/>
                        </td>
                    </tr>
                    
                    <tr>
                        <td>Content</td>
                        <td>
                            <textarea placeholder="내용을 입력해주세요"></textarea>
                        </td>
                    </tr>
                </table>
                
            </div>
            
            <div id="btn_div">
                <v-btn v-on:click="signUp()"><input type="button" class="insBtn" value="수정"></v-btn>
                <v-btn v-on:click="back()"><input type="button" class="backBtn" value="돌아가기"></v-btn>
            </div>
        </div>
    </div>
    
</template>
<script>
import Header from "./Header";
export default {
    components:{
        Header
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