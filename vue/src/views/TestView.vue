<template>
    <div>
        <p v-for="n of count" :key="n">{{text}}</p>
    </div>
</template>

<script lang="ts">
    import { defineComponent,ref } from "vue"

    export default defineComponent({
        setup(props, ctx) {
            const text = ref("HEY!!!")
            const count = ref(5)

            setTimeout(() => {
                text.value = "AAAAAA"
                count.value = 20
            }, 3 * 1000)

            return {
                text,
                count
            }
        },
    })
</script>

<style scoped>

</style>
