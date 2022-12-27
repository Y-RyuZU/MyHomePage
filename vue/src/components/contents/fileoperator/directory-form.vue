<template :class="['template']">
    <el-col :class="['col']" :span="2">
        <el-icon :class="['directory-' + pass, 'icon']" :size="32">
            <Edit/>
        </el-icon>
    </el-col>
    <el-col :class="['col']" :span="10">
        <p :class="['directory-' + pass,'file-name']">1</p>
    </el-col>
    <el-col :class="['col']" :span="4">
        <p :class="['directory-' + pass,'file-size']">2</p>
    </el-col>
    <el-col :class="['col']" :span="4">
        <p :class="['directory-' + pass,'last-change']">3</p>
    </el-col>
    <el-col :class="['col']" :span="4">
        <p :class="['directory-' + pass,'last-editor']">4</p>
    </el-col>
</template>

<script setup lang="ts">
import {Edit} from '@element-plus/icons-vue';

const props = defineProps<{
    pass: String
}>();

// const emits = defineEmits<{
//     (event: "update:isPlay", value: boolean): void,
//     (event: "update:currentTime", value: number): void,
// }>();
</script>

<style scoped lang="scss">
.template {
    border: 1px solid var(--el-border-color);
}
</style>