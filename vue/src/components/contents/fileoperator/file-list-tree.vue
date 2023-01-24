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
                <div style="display: flex; align-items: center; justify-content: space-between">
                    <span style="margin-left: 10px">{{ data.currentValue }}</span>
                    <el-icon :size="20">
                        <Check/>
                    </el-icon>
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

interface DirectoryTree {
    path: string
    name: string
    children?: DirectoryTree[]
}

const propsDirectory = {
    value: 'name',
    label: 'name',
    children: 'children',
}

const tree = ref<DirectoryTree[]>([])

onBeforeMount(async () => {
    const response = await fetch(import.meta.env.MODE === "development" ? "http://localhost:10000/api/files/tree/get" : "/api");
    const directoryTree = await response.json();
    tree.value = Array.of(directoryTree);
})

const drawerRef = ref<InstanceType<typeof ElDrawer>>()

const store = useTreeStore()
const {opener} = storeToRefs(store)
</script>

<style scoped lang="scss">

</style>