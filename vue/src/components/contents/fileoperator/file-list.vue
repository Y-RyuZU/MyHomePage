<template>
    <div style="display: flex; align-items: center" :class="{enter: enterCounter > 0}" @drop.prevent="onDrop"
         @dragenter="onDragEnter" @dragleave="onDragLeave" @dragover.prevent>
        <file-list-tree :path="getPath()"/>
        <el-table
                :data="table"
                style="width: 100%"
                highlight-current-row
                @current-change="handleCurrentChange"
        >
            <el-table-column prop="name" label="Name">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-icon :size="20">
                            <Folder/>
                        </el-icon>
                        <span style="margin-left: 10px">{{ scope.row.name }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="size" label="Size"/>
            <el-table-column prop="lastUpdate" label="Last Update"/>
            <el-table-column prop="lastEditor" label="Last Editor"/>
            <el-table-column align="right" width="450">
                <template #header>
                    <div style="display: flex; align-items: center">
                        <file-list-header :selecting="selecting" @tree="tree = true"/>
                        <el-input v-model="search" size="small" placeholder="Type to search"/>
                    </div>
                </template>
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <el-button
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                    >Delete
                    </el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import {onBeforeMount, ref} from 'vue'
import {ElTable} from 'element-plus'
import {Folder} from '@element-plus/icons-vue'
import FileListHeader from "@/components/contents/fileoperator/file-list-header.vue";
import FileListTree from "@/components/contents/fileoperator/file-list-tree.vue";
import axios from "axios";
import {useRoute} from 'vue-router'

console.log(Array.from(useRoute().path).join('/'))

interface File {
    name: string
    size: number
    unit: string
    type: "file" | "directory"
    lastUpdate?: string
    lastEditor?: string
}

const tree = ref(false)
const enterCounter = ref(0)
const selecting = ref<File>()
const getType = (name: string) => {
    return name.endsWith('.' + new RegExp('.*')) ? 'file' : 'folder'
}
const handleCurrentChange = (val: File | undefined) => {
    selecting.value = val
}
const onDrop = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    enterCounter.value = 0
    const file = e.dataTransfer?.files
    if (!file) return
    const files = [...file]
    files.forEach(file => {
        const url = `http://localhost:10000/api/files/upload`
        const path = 'debug/path1'
        let form = new FormData()
        form.append('file', file)
        form.append('path', path)
        axios.post(url, form).then(response => {
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        })
    })
}
const onDragEnter = () => {
    enterCounter.value++
}
const onDragLeave = () => {
    enterCounter.value--
}

const getPath = () => {
    return useRoute().path
}

const table = ref<File[]>([])

onBeforeMount(async () => {
        const response = await fetch(import.meta.env.MODE === "development" ? "http://localhost:10000/api/files/get" : "/api");
        table.value = await response.json() as File[];
    }
)

const tableData = [
    {
        name: 'None1',
        size: '1',
        unit: 'KB',
        lastUpdate: '2021-01-01',
        lastEditor: 'Tom',
    },
    {
        name: 'None2',
        size: '1',
        unit: 'KB',
        lastUpdate: '2021-01-01',
        lastEditor: 'Tom',
    },
    {
        name: 'None2',
        size: '1',
        unit: 'KB',
        lastUpdate: '2021-01-01',
        lastEditor: 'Tom',
    },
]
</script>

<style scoped lang="scss">
.el-table {
    border: 1px solid #181818;
}

div {
    * {
        &.enter {
            opacity: 0.2;
        }
    }
}
</style>