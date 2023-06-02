<template>
    <v-parallax
        :src="img"
        height="1000"
    >
        <div class="d-flex flex-column fill-height justify-center align-center text-white">
            <h1 class="text-h4 font-weight-thin mb-4">
                Vuetify
            </h1>
            <h4 class="subheading">
                Build your application today!
            </h4>
        </div>
    </v-parallax>
    <p>peropero</p>
</template>

<script setup lang="ts">
import img from "@/assets/images/background3.jpg";
</script>

<style scoped lang="scss">

</style>