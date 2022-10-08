<template>
    <div>
        <!--        <audio @timeupdate="" ref="audioElement" v-bind:src="blobAddress"></audio>-->
        <AudioWrapper ref="wrapperElement" v-bind:src="blobAddress" v-bind:is-play="isPlaying"/>
        <input v-model="address" class="address" placeholder="Audio address"/>
        <p>
            <time id="playback_position">{{ wrapperElement.value.currentTime }}</time>
            <input type="range" v-model="currentTime" v-bind:max="duration" min="0" step="1">
            <time id="end_position">{{ wrapperElement.value.convertedCurrentTime() }}</time>
        </p>
        <button @click="play" v-bind:disabled="currentTime === -1">再生</button>
        <button @click="stop" v-bind:disabled="!isPlaying">停止</button>
        <input v-model="playbackRate" min="0.25" max="16" step="0.05" type="range" v-bind:disabled="isPlaying"/>
        <p>再生速度: {{ playbackRate }}</p>
    </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue"
import AudioWrapper from "../components/AudioWrapper.vue"

const audioElement = ref<HTMLAudioElement | null>(null)
const wrapperElement = ref<AudioWrapper | null>(null)
const address = ref("");
const blobAddress = ref("");
const currentTime = ref(0);
const duration = ref(0);
const playbackRate = ref(1);
const isPlaying = ref(false);

const play = () => {
    audioElement.value?.play()
}

const stop = () => {
    audioElement.value?.pause()
    console.log(audioElement.value)
}

watch(address, async (newAddress) => {
    const response = await fetch(import.meta.env.MODE === "development" ? "http://localhost:10000/api/proxy?url=" + newAddress : "/api");
    const blob = await response.blob();
    if (blobAddress.value != null) URL.revokeObjectURL(blobAddress.value)
    blobAddress.value = URL.createObjectURL(blob);
    audioElement.value = new Audio(blobAddress.value);
    audioElement.value?.setAttribute("src", blobAddress.value);
})
</script>

<style scoped>
.address {
    width: 1000px;
}
</style>