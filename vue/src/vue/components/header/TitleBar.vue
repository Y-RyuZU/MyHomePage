<template>
    <el-space :fill="true" style="width: 100%">
        <el-row align="middle">
            <el-col :span="2">
                <el-avatar :icon="UserFilled"/>
            </el-col>

            <el-col :span="20">
                <el-menu
                    :default-active="activeIndex"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                    :router="true"
                >
                    <el-menu-item index="1">None!</el-menu-item>
                    <el-sub-menu index="2">
                        <template #title>Contents</template>
                        <div v-for="(content, index) in contentsRow1" :key="content">
                            <el-menu-item :index="'2-' + index" :route="'/' + content">
                                {{ content }}
                            </el-menu-item>
                        </div>
                        <el-sub-menu index="2-4">
                            <template #title>item four</template>
                            <el-menu-item index="2-4-1">item one</el-menu-item>
                            <el-menu-item index="2-4-2">item two</el-menu-item>
                            <el-menu-item index="2-4-3">item three</el-menu-item>
                        </el-sub-menu>
                    </el-sub-menu>
                    <el-menu-item index="3">Infomation</el-menu-item>
                    <el-menu-item index="4">Others</el-menu-item>
                </el-menu>
            </el-col>

            <el-col :span="2">
                <el-switch
                    v-model="value1"
                    class="mb-2 switch"
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
const contentsRow1 = ['loginform', 'scheduletable', 'test-animation', 'audio-test']

const value1 = ref(true)


</script>

<style scoped lang="scss">

</style>
