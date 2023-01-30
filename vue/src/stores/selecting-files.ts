import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import type {File} from "@/stores/file-interface"
import axios from "axios";

export const useSelectingFilesStore = defineStore('selectingFiles', () => {
    const selectedFiles = ref<File[]>([])

    function removeFile(file: File) {
        axios.delete('/api/files/' + file.id)
    }

    return {selectedFiles}
})
