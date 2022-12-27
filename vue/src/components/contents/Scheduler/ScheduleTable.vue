<template>
    <div :class="['all']">
        <ul v-for="([day , classes] , index) in schedule" :key="day" :class="[day]">
            <li :style="{backgroundColor: colors[index] }" :class="['day_header']">{{ day }}</li>
            <li v-for="[index , contents] in classes" :key="day" :class="[index , 'day_container']">
                <div v-for="content in contents" :key="day" :class="[index]">{{ content }}</div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import {onBeforeMount, ref} from "vue";

const day = ref(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const);
const clazz = ref(['1st', '2nd', '3rd', '4th', '5th', '6th'] as const);
type tday = typeof day.value[number];
type tclazz = typeof clazz.value[number];
const schedule = ref(new Map<tday, Map<tclazz, string[]>>)
const table = [
    ["a", "b", "c", "d", "e", "f"],
    ["g", "h", "i", "j", "k", "l"],
    ["m", "n", "o", "p", "q", "r"],
    ["s", "t", "u", "v", "w", "x"],
    ["y", "z", "A", "B", "C", "D"],
    ["E", "F", "G", "H", "I", "J"],
    ["K", "L", "M", "N", "O", "P"]
]
const colors = [
    "rgba(255,115,0,0.75)",
    "rgba(72,255,0,0.75)",
    "rgba(255,0,0,0.75 )",
    "rgba(64,123,255,0.75)",
    "rgba(0,134,19,0.75)",
    "rgba(255,249,0,0.75)",
    "rgba(162,96,34,0.75)"
]
day.value.forEach((eachd) => {
    schedule.value.set(eachd, new Map<tclazz, string[]>())
    clazz.value.forEach((eachc) => {
        schedule.value.get(eachd)?.set(eachc, new Array(table[day.value.indexOf(eachd)][clazz.value.indexOf(eachc)]))
    })
});

onBeforeMount(async () => {
    type subjects = {
        contents: string
        subject: tday
        class_index: number
    }

    const day = "Sunday";
    const response = await fetch(import.meta.env.MODE === "development" ? "http://localhost:10000/api/schoolscheduler/export?day=" + day : "/api");
    let json_data = await response.json() as subjects[]
    json_data.forEach((subject) => {
        schedule.value.get(day)?.get(clazz.value[subject.class_index])?.push(subject.subject)
        schedule.value.get(day)?.get(clazz.value[subject.class_index])?.push(subject.contents)
    });
});

</script>

<style scoped lang="scss">
.all {
  display: flex;
  flex-direction: row;
  flex: 1;
  margin-left: 0;
  width: 90vw;
  height: 80vh;

  ul {
    width: 20%;
    padding-left: 10px;

    &:first-child {
      padding-left: 0;
    }
  }

  li {
    list-style: none;
    text-align: center;
    border: 1px solid black;

    &.day_header {
      background-color: #e0e0e0;
    }

    &.day_container {
      height: 15%;
    }

    &:first-child {
      background-color: red;
    }
  }
}
</style>