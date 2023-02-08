import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {File,SelectableFile} from "@/stores/file-interface"
import axios from "axios";

export const useSelectingFilesStore = defineStore('selectingFiles', () => {
    const selectingFiles = ref<File[]>([])
    const computedSelectingFiles = computed({
        get: () => selectingFiles.value,
        set: (value: File[]) => {
            if(!value) return;
            selectingFiles.value = value.filter((file) => file instanceof SelectableFile ? file.selected : true).map((file) => file as File)
        }
    })

    function printSelectingFiles() {
        console.log(selectingFiles.value)
    }

    function addFile(file: File) {
        selectingFiles.value.push(file)
    }

    return {computedSelectingFiles,printSelectingFiles,addFile}
})
