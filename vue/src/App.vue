<script setup lang="ts">
import TitleBar from "./vue/components/header/TitleBar.vue";
import Header from "./vue/components/header/Header.vue";

</script>

<template>
    <v-app id="inspire">
        <v-container class="_header">
            <Header/>
        </v-container>
        <RouterView/>
    </v-app>
<!--    <el-config-provider>-->
<!--        <el-container class="full-height">-->
<!--            <el-header style="border-bottom: #181818 solid 0">-->
<!--                <TitleBar/>-->
<!--            </el-header>-->
<!--            <el-main>-->
<!--                <RouterView/>-->
<!--            </el-main>-->
<!--            <el-footer>-->

<!--            </el-footer>-->
<!--        </el-container>-->
<!--    </el-config-provider>-->
</template>

<style scoped lang="scss">
.header {
    position: relative;
    height: 100%;
    width: 100%;
    background: no-repeat center center fixed;
    background-image: linear-gradient(to right bottom, rgba(34, 34, 34, 0.2), rgba(34, 34, 34, 0.2)), url(@/assets/images/background3.jpg);
    text-align: center;
}

//:global(body) {
//    margin: 0;
//    & * {
//        box-sizing: border-box;
//    }
//}

//.full-height {
//    height: 100vh;
//}
</style>
