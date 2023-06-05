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

    <div>
        <v-btn @click="scroll(-1)">←</v-btn>
        <div ref="scrollContainer" class="carousel-container">
            <v-card
                class="carousel-card"
                :class="{ 'carousel-card-main': index === currentIndex }"
                v-for="(item, index) in items"
                :key="item.id"
            >
                <v-card-title>{{ item.title }}</v-card-title>
                <v-card-text>{{ item.text }}</v-card-text>
            </v-card>
        </div>
        <v-btn @click="scroll(1)">→</v-btn>
    </div>

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
import {ref} from 'vue';

const items = ref([
    {id: 1, title: 'Card 1', text: 'This is card 1'},
    {id: 2, title: 'Card 2', text: 'This is card 2'},
    {id: 3, title: 'Card 3', text: 'This is card 3'},
    {id: 4, title: 'Card 4', text: 'This is card 4'},
    {id: 5, title: 'Card 5', text: 'This is card 5'},
    {id: 6, title: 'Card 6', text: 'This is card 6'},
    {id: 7, title: 'Card 7', text: 'This is card 7'},
    {id: 8, title: 'Card 8', text: 'This is card 8'},
    {id: 9, title: 'Card 9', text: 'This is card 9'},
// 他のカードデータ...
]);

const scrollContainer = ref(null);
const currentIndex = ref(0);

const scroll = (direction: number) => {
    currentIndex.value += direction;
    if (currentIndex.value < 0) currentIndex.value = 0;
    if (currentIndex.value >= items.value.length) currentIndex.value = items.value.length - 1;

    scrollContainer.value?.scrollLeft = currentIndex.value * 210; // 210 is the width of the card + margin
}
</script>

<style scoped lang="scss">
.carousel-container {
    overflow-x: hidden;
    white-space: nowrap;
}

.carousel-card {
    display: inline-block;
    width: 200px;
    margin: 10px;
    visibility: hidden;
    transition: transform 0.3s ease;
}

.carousel-card-main {
    transform: scale(1.5);
    visibility: visible;
}
</style>