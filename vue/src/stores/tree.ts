import {ref, computed} from 'vue'
import {defineStore} from 'pinia'

export const useTreeStore = defineStore('counter', () => {
    const open = ref(false)
    const opener = computed({
        get: () => open.value,
        set: (value: boolean) => open.value = value
    })

    function toggle() {
        opener.value = !opener.value
    }

    return {open, opener, toggle}
})
