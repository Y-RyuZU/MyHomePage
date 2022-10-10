<template>
    <div>
        <el-button v-for="item in 5"
                   :key="item"
                   :class="['subject-button', item, { selected: selectedButton === item }]"
                   @click="selectedButton = item"
        >
            Default
        </el-button>
        <el-scrollbar height="400px" :class="['scrollbar-demo']">
            <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

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