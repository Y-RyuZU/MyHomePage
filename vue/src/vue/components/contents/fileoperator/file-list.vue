<template>
    <div style="display: flex; align-items: center" :class="{enter: enterCounter > 0}" @drop.prevent="onDrop"
         @dragenter="onDragEnter" @dragleave="onDragLeave" @dragover.prevent>
        <file-list-tree :path="getPath"/>
        <el-table
                :data="data"
                style="width: 100%"
                :row-style="rowStyle"
                @row-click="rowClick"
                @row-dblclick="rowDblClick"
                :default-sort="{order: 'descending', prop: 'name'}"
        >
            <el-table-column prop="name" label="Name">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-icon :size="20">
                            <Folder v-if="scope.row.type === 'directory'"/>
                            <DocumentRemove v-else/>
                        </el-icon>
                        <span style="margin-left: 10px">{{ scope.row.name }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="size" label="Size"/>
            <el-table-column prop="unit" label="Unit"/>
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
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {ElTable} from 'element-plus'
import {DocumentRemove, Folder} from '@element-plus/icons-vue'
import FileListHeader from "@/components/contents/fileoperator/file-list-header.vue";
import FileListTree from "@/components/contents/fileoperator/file-list-tree.vue";
import {Folder} from '@element-plus/icons-vue'
import FileListHeader from "@/vue/components/contents/fileoperator/file-list-header.vue";
import FileListTree from "@/vue/components/contents/fileoperator/file-list-tree.vue";
import axios from "axios";
import {useSelectingFilesStore} from "@/stores/selecting-files";
import {computedAsync} from "@vueuse/core";
import {File, SelectableFile} from "@/stores/file-interface";
import {useRoute} from 'vue-router'
import router from "@/router";

const route = useRoute()
const tree = ref(false)
const enterCounter = ref(0)
const getType = (name: string) => {
    return name.endsWith('.' + new RegExp('.*')) ? 'file' : 'folder'
}
const rowClick = (row: SelectableFile) => {
    row.selected = !row.selected
    storeFiles.computedSelectingFiles = data.value
}
const rowDblClick = (row: SelectableFile) => {
    if (row.type === 'file') return
    storeFiles.computedSelectingFiles = []
    router.push(route.path + "/" + row.name)
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
        files.sort((a: File, b: File) => {
            if (a.type === 'directory' && b.type === 'file') return -1
            if (a.type === 'file' && b.type === 'directory') return 1
            return a.name.localeCompare(b.name)
        })
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
            opacity: 0.4;
        }
    }
}
</style>