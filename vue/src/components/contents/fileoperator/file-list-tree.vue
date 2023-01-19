<template>
    <el-drawer
        ref="drawerRef"
        v-model="opener"
        title="I have a nested form inside!"
        direction="ltr"
        class="demo-drawer"
    >
        <el-tree-v2 :data="data" :props="props"/>
    </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElDrawer } from 'element-plus'
import {useTreeStore} from "@/stores/tree";
import {storeToRefs} from "pinia";

interface Tree {
    id: string
    label: string
    children?: Tree[]
}

const getKey = (prefix: string, id: number) => {
    return `${prefix}-${id}`
}

const createData = (
    maxDeep: number,
    maxChildren: number,
    minNodesNumber: number,
    deep = 1,
    key = 'node'
): Tree[] => {
    let id = 0
    return Array.from({ length: minNodesNumber })
        .fill(deep)
        .map(() => {
            const childrenNumber =
                deep === maxDeep ? 0 : Math.round(Math.random() * maxChildren)
            const nodeKey = getKey(key, ++id)
            return {
                id: nodeKey,
                label: nodeKey,
                children: childrenNumber
                    ? createData(maxDeep, maxChildren, childrenNumber, deep + 1, nodeKey)
                    : undefined,
            }
        })
}

const props = {
    value: 'id',
    label: 'label',
    children: 'children',
}
const data = createData(3, 15, 20)

const drawerRef = ref<InstanceType<typeof ElDrawer>>()

const tree = useTreeStore()
const {opener} = storeToRefs(tree)
</script>

<style scoped lang="scss">

</style>