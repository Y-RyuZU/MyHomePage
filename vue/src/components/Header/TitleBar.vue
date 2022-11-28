<template>
    <el-space style="width: 100%" alignment="center">
      <el-row>
        <el-avatar :icon="UserFilled"/>
      </el-row>
      <el-row>
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
        >
          <el-menu-item index="1">Processing Center</el-menu-item>
          <el-sub-menu index="2">
            <template #title>Workspace</template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
            <el-sub-menu index="2-4">
              <template #title>item four</template>
              <el-menu-item index="2-4-1">item one</el-menu-item>
              <el-menu-item index="2-4-2">item two</el-menu-item>
              <el-menu-item index="2-4-3">item three</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="3">Info</el-menu-item>
          <el-menu-item index="4">Orders</el-menu-item>
        </el-menu>
      </el-row>
      <el-row justify="end">
        <el-col :span="0">
          <el-switch
              v-model="value1"
              class="mb-2 switch darkmode"
              :active-icon="Moon"
              :inactive-icon="Sunny"
              inline-prompt
              size="large"
          />
        </el-col>
      </el-row>
    </el-space>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {Moon, Sunny, UserFilled} from '@element-plus/icons-vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const value1 = ref(true)


</script>

<style scoped lang="scss">

</style>
