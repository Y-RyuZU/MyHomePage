<template :class="['demodemo']">
    <!--    <el-row align="middle">-->
    <!--        <directory-form-header :pass="pass"/>-->
    <!--        <directory-form :class="['line']" v-for="item in files" :key="item" :pass="item"/>-->
    <!--    </el-row>-->
    <el-table
            :data="tableData"
            style="width: 100%"
            highlight-current-row
            @current-change="handleCurrentChange"
    >
        >
        <el-table-column prop="date" label="Date"/>
        <el-table-column prop="name" label="Name"/>
        <el-table-column prop="zip" label="Zip"/>
        <el-table-column label="Address Info" fixed="right">
            <el-table-column prop="state" label="State"/>
            <el-table-column prop="city" label="City"/>
            <el-table-column prop="address" label="Address"/>
        </el-table-column>
    </el-table>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {ElTable} from 'element-plus'

const files = ref(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const);

const currentRow = ref()
const singleTableRef = ref<InstanceType<typeof ElTable>>()

interface User {
    date: string
    name: string
    address: string
}

const setCurrent = (row?: User) => {
    singleTableRef.value!.setCurrentRow(row)
}
const handleCurrentChange = (val: User | undefined) => {
    currentRow.value = val
}
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    },
]
</script>

<style scoped lang="scss">
//.line {
//    border: 1px solid var(--el-border-color);
//}
</style>