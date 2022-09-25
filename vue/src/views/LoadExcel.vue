<template>
    <div>
        <button @click="Reload">再読み込み</button>
        <!--        <p v-for="key in keys" class="key">{{ key }}</p>-->
        <!--        <p v-for="value in values" class="value">{{ value }}</p>-->
        <p v-for="(value,key) in contents" class="contents">{{ key }}: {{ value }}</p>
    </div>
</template>
<script>
import {defineComponent, ref} from "vue";

export default defineComponent({
    setup(props, ctx) {
        const keys = ref([])
        const values = ref([])
        const contents = ref([])

        const Reload = async () => {
            const response = await fetch(import.meta.env.MODE === "development" ? "http://localhost:10000/api/random_data" : "/api");
            const json_data = await response.json();
            contents.value = json_data
            keys.value = Object.keys(json_data)
            values.value = Object.values(json_data)
        }

        return {
            Reload,
            keys,
            values,
            contents
        }
    }
})
</script>

<style scoped>
div {
    background: pink;
    width: 150px;
    height: 150px;
    position: absolute;
    top: 50%;
    left: 50%;
}

.key {
    color: red;
    display: inline-block;
    width: 200px;
}

.value {
    display: flex;
    justify-content: center;
    align-content: center;
    color: green;
    width: 200px;
}

.contents {
    display: flex;
    justify-content: left;
    align-content: center;
    color: green;
    width: 200px;
}
</style>