<template>
    <el-drawer
            ref="drawerRef"
            v-model="opener"
            title="I have a nested form inside!"
            direction="ltr"
            class="demo-drawer"
    >
        <el-tree-v2 :data="tree" :props="propsDirectory" :height="1000">
            <template #default="{ node, data }">
                <div style="display: flex; align-items: center;">
                    <p style="margin: 0;" @click="changeDirectory(data.path)">{{ node.label }}</p>
<!--                    <el-icon style="margin-left: auto; margin-right: 0;" :size="20">-->
<!--                        <Check/>-->
<!--                    </el-icon>-->
                </div>
            </template>
        </el-tree-v2>
    </el-drawer>
</template>

<script setup lang="ts">
import {onBeforeMount, ref} from 'vue'
import {ElDrawer} from 'element-plus'
import {useTreeStore} from "@/stores/tree";
import {storeToRefs} from "pinia";
import {Check} from '@element-plus/icons-vue'
import router from "@/router";
import {useRoute} from "vue-router";
import axios from "axios";
import {useSelectingFilesStore} from "@/stores/selecting-files";

interface DirectoryTree {
    path: string
    name: string
    children?: DirectoryTree[]
}

const propsDirectory = {
    value: 'path',
    label: 'name',
    children: 'children',
}

const tree = ref<DirectoryTree[]>([])

onBeforeMount(async () => {
    const response = await axios("http://localhost:10000/api/files/tree/get/src");
    tree.value = Array.of(await response.data);
})

const drawerRef = ref<InstanceType<typeof ElDrawer>>()

const changeDirectory = (path: string) => {
    storeFiles.computedSelectingFiles = []
    router.push(route.path.replace("/" + [route.params.path].flat().join('/'), "") + path)
    drawerRef.value?.close()
}

const storeTree = useTreeStore()
const storeFiles = useSelectingFilesStore()
const route = useRoute()
const {opener} = storeToRefs(storeTree)
</script>

<style scoped lang="scss">

</style>