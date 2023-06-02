<template>
    <div>
        <el-button v-for="(color , index) in subjects"
                   :key="index"
                   :style="{color: color}"
                   :class="['subject-button',color , index, { selected: selectedButton === index }]"
                   @click="selectedButton = index"
        >
            Default
        </el-button>
        <div v-for="(color,index) in subjects">
            <el-scrollbar height="400px"
                          :class="['scrollbar-demo']"
                          v-if="selectedButton === index"
            >
                <p v-for="item in contents.get(color)"
                   :key="item"
                   :class="['scrollbar-demo-item']"
                   :style="{color: color}"
                   v-if="selectedButton === index"
                >{{ item }}</p>
            </el-scrollbar>
        </div>
    </div>
</template>

<script setup lang="ts">
import {onBeforeMount, ref} from "vue";

const subjects = ref(['orange', 'red', 'green', 'blue'] as const);
type Subjects = typeof subjects.value[number];
const contents = ref(new Map<Subjects, string[]>)
subjects.value.forEach((subject) => {
    contents.value.set(subject, [])
});

onBeforeMount(async () => {
    const response = await fetch(import.meta.env.MODE === "development" ? "http://localhost:10000/api/subjects/export" : "/api");
    let json_data = await response.json()
    contents.value.get("orange")?.push(...json_data);
});

contents.value.get("orange")?.push("100%オレンジジュース");
contents.value.get("red")?.push("100%リンゴジュース");
contents.value.get("green")?.push("100%メロンジュース");
contents.value.get("blue")?.push("100%ブルーハワイジュース");

let selectedButton = ref(0);
</script>

<style scoped lang="scss">
.scrollbar-demo {
  border-top: solid rgba(200, 200, 200, 0.7) 2px;
}

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  padding: 10px;
  text-align: center;
  border-radius: 4px;
  background-color: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.subject-button {
  padding: 10px;
  width: 100px;
  height: 30px;
  border-radius: 0;
  border-color: transparent;
  color: #000000;
}

.selected {
  color: #2a4daf;
  border-bottom: solid 3px rgba(50, 100, 255, 0.8);
}
</style>