<template>
    <div id="login_div">
        <h1>OJT 회원가입</h1>
        <div id="input_div">
            <table>
                <tr>
                    <td>아이디 : </td>
                    <td>
                        <input type="text" class="input_nomal" v-model="createData['userId']"/>
                        <v-btn v-on:click="idChk()"><input type="button" value="중복체크"></v-btn>
                    </td>
                </tr>
                
                <tr>
                    <td>이름 : </td>
                    <td>
                        <input type="text" class="input_nomal" v-model="createData['userName']"/>
                    </td>
                </tr>
                
                <tr>
                    <td>비밀번호 : </td>
                    <td>
                        <input type="password" class="input_nomal" v-model="createData['userPW']"/>
                    </td>
                </tr>
                
                <tr>
                    <td>비밀번호 확인 : </td>
                    <td>
                        <input type="password" class="input_nomal" v-model="createData['userPWChk']"/>
                    </td>
                </tr>
                
                <tr>
                    <td>이메일 : </td>
                    <td>
                        <input type="text" class="input_nomal" v-model="createData['userEmail1']"/>
                        @
                        <input type="text" class="input_nomal" v-model="createData['userEmail2']"/>
                    </td>
                </tr>
                
                <tr>
                    <td>휴대폰 번호 : </td>
                    <td>
                        <input type="text" class="input_nomal" v-model="createData['userPhone1']"/>-
                        <input type="text" class="input_nomal" v-model="createData['userPhone2']"/>-
                        <input type="text" class="input_nomal" v-model="createData['userPhone3']"/>
                    </td>
                </tr>
                
                <tr>
                    <td>회사 아이디 : </td>
                    <td>
                        <input type="text" class="input_nomal" placeholder="발급 받은 회사 아이디를 입력해주세요" v-model="createData['corpId']"/>
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
import axios from 'axios';
export default {
    name:"SignUp",
    data(){
        return{
            createData:{
                "userId":null,
                "userName":null,
                "userPW":null,
                "userPWChk":null,
                "userEmail1":null,
                "userEmail2":null,
                "userPhone1":null,
                "userPhone2":null,
                "userPhone3":null,
                "corpId":null
            }
        }
    },
    methods: {
        back(){
            history.back();
        },
        async signUp(){
            try {
                if(this.createData['userId'] === null || this.createData['userName'] === null|| this.createData['corpId'] === null|| this.createData['password'] === null){
                    alert("fill every data");
                    return;
                }
                if(this.createData['userPW']!=this.createData['userPWChk']){
                    alert("check password");
                    return;
                }
                const email=this.createData['userEmail1']+"@"+this.createData['userEmail2'];
                const mobile=this.createData['userPhone1']+"-"+this.createData['userPhone2']+"-"+this.createData['userPhone3'];
                

                await axios.post(
                    'http://localhost:3000/graphql',{
                    query: `
                        mutation{
                            createUser(
                                Company:${this.createData['corpId']},
                                UserId:"${this.createData['userId']}",
                                UserName:"${this.createData['userName']}",
                                UserPW:"${this.createData['userPW']}",
                                UserEmail:"`+email+`",
                                UserMobile:"`+mobile+`"
                            ){
                                resultCount
                            }
                        }`
                    },
                );
                alert(`user created! userId: ${this.createData['userId']} and name: ${this.createData['userName']}`);
                this.$router.push({
                    path:'/'
                })
            } catch (error) {
                alert(`createUserData Funtion error : ${error}`);
                console.log(`createUserData Funtion error : ${error}`);
                throw error;
            }
        }

        
    } 
    
}
</script>
<style scoped>
    .insBtn{
        background-color:rgb(52, 152, 219) ;
        width: 60px;
    }
    .backBtn{
        background-color:#cccccc ;
        width: 60px;
    }
</style>