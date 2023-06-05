<template>
    <v-container fluid>
        <v-row>
            <v-col
                    cols="12"
                    md="4"
                    v-for="(card, index) in threeCards"
                    :key="card.title"
            >
                <v-card flat tile>
                    <v-img
                            :src="card.src"
                            class="align-end"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="20vh"
                            cover
                    >
                        <div class="d-flex flex-row align-center justify-space-between">
                            <div class="">
                                <v-btn icon="mdi-arrow-left" size="x-small" @click="scroll(1)"
                                       v-if="index === 1"></v-btn>
                            </div>
                            <div class="">
                                <v-btn icon="mdi-arrow-right" size="x-small" @click="scroll(-1)"
                                       v-if="index === 1"></v-btn>
                            </div>
                        </div>
                        <v-card-title class="text-white" v-text="card.title"></v-card-title>
                    </v-img>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';

const cards = ref([
    {title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'},
    {title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg'},
    {title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg'},
    {title: 'Top 10 getaways', src: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
]);

const currentIndex = ref(0);

const scroll = (direction: number) => {
    if (currentIndex.value + direction < 0) currentIndex.value = cards.value.length - 1;
    else if (currentIndex.value + direction >= cards.value.length) currentIndex.value = 0;
    else currentIndex.value += direction;
}

const getCurrentIndex = computed(() => {
    return currentIndex.value;
})

const threeCards = computed(() => {
    return [
        cards.value[leftIndex()],
        cards.value[getCurrentIndex.value],
        cards.value[rightIndex()],
    ];
})

const leftIndex = () => {
    return currentIndex.value - 1 >= 0 ? currentIndex.value - 1 : cards.value.length - 1;
}

const rightIndex = () => {
    return currentIndex.value + 1 < cards.value.length ? currentIndex.value + 1 : 0;
}
</script>

<style scoped lang="scss">

</style>