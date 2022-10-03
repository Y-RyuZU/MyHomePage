<template>
    <div>
        <button @click="Reload">再読み込み</button>
        <!--        <p v-for="key in keys" class="key">{{ key }}</p>-->
        <!--        <p v-for="value in values" class="value">{{ value }}</p>-->
        <table>
            <tr>
                <th class="key">{{ head_key }}</th>
                <th class="value">{{ head_value }}</th>
            </tr>
            <tr v-for="(value,key) in contents">
                <td class="keys">{{ key }}</td>
                <td class="values">{{ value }}</td>
            </tr>
        </table>
    </div>
</template>
<script lang="ts">
import {defineComponent, ref} from "vue";

export default defineComponent({
    setup(props, ctx) {
        const head_key = ref("")
        const head_value = ref("")
        const contents = ref([])

        const Reload = async () => {
            const response = await fetch(import.meta.env.MODE === "development" ? "http://localhost:10000/api/random_data" : "/api");
            let json_data = await response.json()
            head_key.value = Object.keys(json_data)[0];
            head_value.value = Object.values(json_data)[0];
            json_data = Object.entries(json_data);
            json_data.shift();
            contents.value = Object.fromEntries(json_data);
        }

        return {
            Reload,
            head_key,
            head_value,
            contents
        }
    }
})
</script>

<style scoped>
div {
    width: 500px;
    height: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
}

.contents {
    display: flex;
    justify-content: left;
    align-content: center;
    color: green;
    width: 200px;
}

table {
    display: flex;
    border-collapse: collapse;
}

tr {
    background: pink;
    list-style: none;
}

th, td {
    border: solid 1px;
    padding: 10px;
    display: block;
    text-decoration: none;
    color: white;
}

th {
    color: black;
}

td {
    color: blue;
}


</style>