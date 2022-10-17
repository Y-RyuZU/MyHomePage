<template>
    <div>
        <AudioWrapper
                v-model:src="blobAddress"
                v-model:is-play="wrapper.isPlay"
                v-model:current-time.number="wrapper.currentTime"
                v-model:playback-rate.number="wrapper.playbackRate"
                v-model:duration.number="wrapper.duration"
                v-model:converted-current-time="wrapper.convertedCurrentTime"
                v-model:converted-duration="wrapper.convertedDuration"
                v-model:update="wrapper.update"
        />
        <input v-model="address" class="address" placeholder="Audio address"/>
        <p>
            <time id="currentTime">{{ wrapper.convertedCurrentTime }}</time>
            <input type="range" :value="wrapper.currentTime" @input="setCurrentTime" :max="wrapper.duration" min="0"
                   step="1">
            <time id="duration">{{ wrapper.convertedDuration }}</time>
        </p>
        <button @click="wrapper.isPlay = true" v-bind:disabled="wrapper.currentTime === -1">再生</button>
        <button @click="wrapper.isPlay = false" v-bind:disabled="!wrapper.isPlay">停止</button>
        <input v-model.number="wrapper.playbackRate" min="0.25" max="16" step="0.05" type="range"
               :disabled="!wrapper.isPlay"/>
        <p>再生速度: {{ wrapper.playbackRate }}</p>
    </div>
</template>

<script setup lang="ts">
import {reactive, ref, watch} from "vue"
import AudioWrapper from "../components/AudioWrapper.vue"

const address = ref("");
const blobAddress = ref("");
const wrapper = reactive({
    currentTime: 0,
    convertedCurrentTime: "00:00",
    convertedDuration: "00:00",
    duration: 0,
    playbackRate: 1,
    isPlay: false,
    update: false
})

const setCurrentTime = (e: Event) => {
    const target = e.target as HTMLInputElement;
    wrapper.currentTime = Number(target.value);
    wrapper.update = true;
}

watch(address, async (newAddress) => {
    const response = await fetch(import.meta.env.MODE === "development" ? "http://localhost:10000/api/proxy?url=" + newAddress : "/api");
    console.log(response);
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