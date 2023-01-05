<template>
    <el-icon :size="20">
        <Share/>
    </el-icon>
    <el-icon :size="20">
        <Edit/>
    </el-icon>
    <el-icon :size="20">
        <CopyDocument/>
    </el-icon>
    <el-icon :size="20">
        <Sort/>
    </el-icon>
    <el-icon :size="20">
        <Download/>
    </el-icon>
    <el-icon :size="20">
        <Delete/>
    </el-icon>
    <el-icon :size="20" @click="tree.toggle()">
        <Guide/>
    </el-icon>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import {Share, Edit, CopyDocument, Sort, Download, Delete,Guide} from '@element-plus/icons-vue'
import {useTreeStore} from "@/stores/tree";
import {storeToRefs} from "pinia";

interface File {
    name: string
    size: number
    unit: string
    type: "file" | "folder"
    lastUpdate: string
    lastEditor: string
}

const tree = useTreeStore()

</script>

<style scoped lang="scss">
.el-icon {
    margin: 0 5px;
    cursor: pointer;
}
</style>