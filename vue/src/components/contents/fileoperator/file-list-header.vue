<template>
    <el-icon :size="20">
        <Share/>
    </el-icon>
    <el-icon :size="20">
        <Edit @click="printSelectingFiles"/>
    </el-icon>
    <el-icon :size="20">
        <Top @click="moveUpOneLevel"/>
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
import {Share, Edit, CopyDocument, Sort, Download, Delete, Guide, Top} from '@element-plus/icons-vue'
import {useTreeStore} from "@/stores/tree";
import {useSelectingFilesStore} from "@/stores/selecting-files";
import {storeToRefs} from "pinia";
import type {File} from "@/stores/file-interface"
import router from "@/router";
import {useRoute} from "vue-router";

const moveUpOneLevel = () => {
    storeFiles.computedSelectingFiles = []
    const path = route.path.split("/");
    path.pop();
    router.push(path.join("/"))
}

const tree = useTreeStore()
const storeFiles = useSelectingFilesStore()
const route = useRoute()
const {printSelectingFiles} = storeFiles

</script>

<style scoped lang="scss">
.el-icon {
    margin: 0 5px;
    cursor: pointer;
}
</style>