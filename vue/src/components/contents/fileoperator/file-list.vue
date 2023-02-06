<template>
    <div style="display: flex; align-items: center" :class="{enter: enterCounter > 0}" @drop.prevent="onDrop"
         @dragenter="onDragEnter" @dragleave="onDragLeave" @dragover.prevent>
        <file-list-tree :path="getPath"/>
        <el-table
            :data="data"
            style="width: 100%"
            :row-style="rowStyle"
            @selection-change="selectionChange"
            @row-click="rowClick"
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
import {ref} from 'vue'
import {ElTable} from 'element-plus'
import {Folder} from '@element-plus/icons-vue'
import FileListHeader from "@/components/contents/fileoperator/file-list-header.vue";
import FileListTree from "@/components/contents/fileoperator/file-list-tree.vue";
import axios from "axios";
import {useRoute} from 'vue-router'
import {useSelectingFilesStore} from "@/stores/selecting-files";
import {computedAsync} from "@vueuse/core";
import {File, SelectableFile} from "@/stores/file-interface";

const route = useRoute()
const tree = ref(false)
const enterCounter = ref(0)
const selecting = ref<SelectableFile[]>([])
const getType = (name: string) => {
    return name.endsWith('.' + new RegExp('.*')) ? 'file' : 'folder'
}
const selectionChange = (val: SelectableFile[]) => {
    selecting.value = val
}
const rowClick = (row: SelectableFile) => {
    row.selected = !row.selected
}
const rowStyle = ({row}: { row: SelectableFile }) => {
    return row.selected ? 'background-color: rgba(100,100,255,0.3);' : '';
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

const data = computedAsync(
    async () => {
        const path = [route.params.path].flat().join('/')
        const response = await axios.get('http://localhost:10000/api/files/get/' + path);
        const files = response.data as File[];
        storeFiles.computedSelectingFiles = files;
        return files.map(file => new SelectableFile(file));
    }
)

const storeFiles = useSelectingFilesStore()
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