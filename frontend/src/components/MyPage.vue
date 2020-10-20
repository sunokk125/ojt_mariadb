<template>
    <div id="wrap">
        <Header></Header>
        <div id="body">
            <router-link :to="{name:'updateUser'}">
                <div id="box">
                    회원정보수정
                </div>
            </router-link>
            
            <router-link :to="{name:'updateCorp'}">
                <div id="box">
                    회사수정
                </div>
            </router-link>

        </div>
    </div>
    
</template>
<script>
import Header from "./Header.vue";
export default {
    components : {
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