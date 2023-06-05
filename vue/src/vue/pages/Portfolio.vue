<template>
    <v-parallax :src="img">
        <div class="d-flex flex-column fill-height justify-center align-center text-white">
            <h1 class="text-h4 font-weight-thin mb-4">
                Vuetify
            </h1>
            <h4 class="subheading">
                Build your application today!
            </h4>

            <v-container fluid>
                <ContentsBar/>
            </v-container>
        </div>
    </v-parallax>

    <v-container>
        <v-row>
            <v-col
                    v-for="n in 12"
                    :key="n"
                    cols="4"
            >
                <SkillCards/>
            </v-col>
        </v-row>
    </v-container>

    <v-container>
        <v-row>
            <v-col
                    v-for="n in 12"
                    :key="n"
                    cols="4"
            >
                <SkillBar/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import img from "@/assets/images/background3.jpg";
import SkillCards from "@/vue/components/contents/SkillCards.vue";
import SkillBar from "@/vue/components/contents/SkillBar.vue";
import ContentsBar from "@/vue/components/contents/ContentsBar.vue";</script>

<style scoped lang="scss">

</style>