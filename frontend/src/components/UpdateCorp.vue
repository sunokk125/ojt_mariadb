<template>
    <div id="wrap">
        <Header></Header>
        <div id="body">
            <table>
                <tr>
                    <td class="no_1st">No</td>
                    <td class="title_1st">Title</td>
                    <td class="writer_1st">Writer</td>
                    <td class="date_1st">Date</td>
                    <td class="count_1st">Count</td>
                    <td class="coment_1st">Coment</td>
                </tr>
                <tr>
                    <td class="no">No</td>
                    <td class="title">Title</td>
                    <td class="writer">Writer</td>
                    <td class="date">Date</td>
                    <td class="count">Count</td>
                    <td class="coment">Coment</td>
                </tr>
            </table>
            <div id="insertPost">
                <router-link :to="{name:insertPost}"><input type="button" value="글쓰기"></router-link>
            </div>
            <div id="pageNum">
                <router-link :to="{name : main}"><div>1</div></router-link>
            </div>
        </div>
    </div>
    
</template>
<script>
import Header from './Header.vue';
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