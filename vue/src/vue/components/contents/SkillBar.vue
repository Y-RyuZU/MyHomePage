<template>
    <v-container>
        <v-card>
            <v-card-title>
                Sales Statistics
            </v-card-title>
            <v-card-text>
                <div v-for="(item, index) in salesData" :key="index">
                    <span>{{ item.name }}</span>
                    <v-progress-linear
                            :model-value="item.value"
                            height="20"
                            color="blue-grey"
                            striped
                    ></v-progress-linear>
                </div>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
const salesData = [
    {name: "Q1", value: 10},
    {name: "Q2", value: 15},
]
</script>

<style scoped lang="scss">

</style>