<template>
    <el-col :span="12">
        <p :class="['directory-' + pass,'file-name']">名前</p>
    </el-col>
    <el-col :span="4">
        <p :class="['directory-' + pass ,'file-size']">サイズ</p>
    </el-col>
    <el-col :span="4">
        <p :class="['directory-' + pass,'last-change']">最終変更日</p>
    </el-col>
    <el-col :span="4">
        <p :class="['directory-' + pass,'last-editor']">最終変更者</p>
    </el-col>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">

</style>