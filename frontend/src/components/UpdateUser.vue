<template>
    <div id="wrap">
        <Header></Header>
        <div id="input_div">
            <h3>회원정보수정</h3>
            <table>
                <tr>
                    <td>아이디 : </td>
                    <td>
                        <input type="text" class="input_nomal" v-model="userId"/>
                        <v-btn v-on:click="idChk()"><input type="button" value="중복체크"></v-btn>
                    </td>
                </tr>
                
                <tr>
                    <td>비밀번호 : </td>
                    <td>
                        <input type="text" class="input_nomal" v-model="userPW"/>
                    </td>
                </tr>
                
                <tr>
                    <td>비밀번호 확인 : </td>
                    <td>
                        <input type="text" class="input_nomal" v-model="userPWChk"/>
                    </td>
                </tr>
                
                <tr>
                    <td>이메일 : </td>
                    <td>
                        <input type="text" class="input_nomal" v-model="userEmail"/>
                        @
                        <input type="text" class="input_nomal" v-model="userEmail"/>
                    </td>
                </tr>
                
                <tr>
                    <td>휴대폰 번호 : </td>
                    <td>
                        <input type="text" class="input_nomal" v-model="userPhone"/>-
                        <input type="text" class="input_nomal" v-model="userPhone"/>-
                        <input type="text" class="input_nomal" v-model="userPhone"/>
                    </td>
                </tr>
                
                <tr>
                    <td>회사 아이디 : </td>
                    <td>
                        <input type="text" class="input_nomal" placeholder="발급 받은 회사 아이디를 입력해주세요" v-model="userId"/>
                    </td>
                </tr>
            </table>
            <div id="btn_div">
                <v-btn v-on:click="signUp()"><input type="button" class="insBtn" value="가입하기"></v-btn>
                <v-btn v-on:click="back()"><input type="button" class="backBtn" value="돌아가기"></v-btn>
            </div>
        </div>
    </div>
    
</template>
<script>
import Header from './Header.vue';
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
    
</style>