<script setup lang="ts">
import TitleBar from "./components/header/TitleBar.vue";

</script>

<template>
    <el-config-provider>
        <el-container class="full-height">
            <el-header style="border-bottom: #181818 solid 0">
                <TitleBar/>
            </el-header>
            <el-main>
                <RouterView class="router"/>
            </el-main>
            <el-footer>

            </el-footer>
        </el-container>
    </el-config-provider>
</template>

<style scoped lang="scss">
:global(body) {
    margin: 0;
    & * {
        box-sizing: border-box;
    }
}

.full-height {
    height: 100vh;
}
</style>
