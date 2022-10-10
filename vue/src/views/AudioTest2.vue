<template>
    <div>
        <AudioWrapper
                v-model:src="blobAddress"
                v-model:is-play="wrapper.isPlaying"
                v-model:current-time.number="wrapper.currentTime"
                v-model:playback-rate.number="wrapper.playbackRate"
                v-model:duration.number="wrapper.duration"
        />
        <input v-model="address" class="address" placeholder="Audio address"/>
        <p>
            <time id="currentTime">{{ wrapper.convertedCurrentTime }}</time>
            <input type="range" v-model.number="wrapper.currentTime" v-bind:max="wrapper.duration" min="0" step="1">
            <time id="duration">{{ wrapper.convertedDuration }}</time>
        </p>
        <button @click="wrapper.isPlaying = true" v-bind:disabled="wrapper.currentTime === -1">再生</button>
        <button @click="wrapper.isPlaying = false" v-bind:disabled="!wrapper.isPlaying">停止</button>
        <input v-model.number="wrapper.playbackRate" min="0.25" max="16" step="0.05" type="range"
               :disabled="!wrapper.isPlaying"/>
        <p>再生速度: {{ wrapper.playbackRate }}</p>
    </div>
</template>

<script setup lang="ts">
import {reactive, ref, watch} from "vue"
import AudioWrapper from "../components/AudioWrapper.vue"

const address = ref("");
const blobAddress = ref("");
// const currentTime = ref(0);
// const duration = ref(0);
// const playbackRate = ref(1);
const wrapper = reactive({
    currentTime: 0,
    convertedCurrentTime: "00:00",
    convertedDuration: "00:00",
    duration: 0,
    playbackRate: 1,
    isPlaying: false
})

watch(address, async (newAddress) => {
    const response = await fetch(import.meta.env.MODE === "development" ? "http://localhost:10000/api/proxy?url=" + newAddress : "/api");
    const blob = await response.blob();
    if (blobAddress.value != null) URL.revokeObjectURL(blobAddress.value)
    blobAddress.value = URL.createObjectURL(blob);
})

</script>

<style scoped>
.address {
    width: 1000px;
}
</style>