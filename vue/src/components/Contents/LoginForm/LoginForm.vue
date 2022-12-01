<template>
    <el-form :model="form" label-width="120px">
        <el-form-item label="User Name">
            <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="Stay signed in">
            <el-switch v-model="form.keep"/>
        </el-form-item>
        <el-form-item label="Password">
            <el-input type="password" placeholder="Please input password" v-model="form.password" show-password/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button>Cancel</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import {reactive} from 'vue'
import {ElMessage} from "element-plus";

// do not use same name with ref
const form = reactive({
    name: '',
    keep: true,
    password: '',
})

const onSubmit = () => {
    ElMessage({
        message: 'Success',
        type: 'success'
    })
}
</script>

<style scoped lang="scss">

</style>