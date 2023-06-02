<template>
    <div>
        <audio @timeupdate="" ref="audioElement" v-bind:src="blobAddress"></audio>
        <!--        <AudioWrapper v-bind:src="blobAddress"/>-->
        <input v-model="address" class="address" placeholder="Audio address"/>
        <p>
            <time id="playback_position">{{ convertTime(currentTime()) }}</time>
            <input type="range" v-bind:value="currentTime()" @input="setCurrentTime($event.target.value)"
                   v-bind:max="duration()" min="0" step="1">
            <time id="end_position">{{ convertTime(duration()) }}</time>
        </p>
        <button @click="play" v-bind:disabled="currentTime() === -1">再生</button>
        <button @click="stop" v-bind:disabled="!isPlaying()">停止</button>
        <input v-bind:value="playbackRate()" @input="setPlayBackRate($event.target.value)" min="0.25" max="16"
               step="0.05" type="range" v-bind:disabled="currentTime() === -1"/>
        <p>再生速度: {{ playbackRate() }}</p>
    </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, watch} from "vue"

export default defineComponent({
    // components: {AudioWrapper: () => import("./AudioWrapper.vue")},
    setup(props, ctx) {
        const audioElement = ref<HTMLAudioElement | null>(null)
        const address = ref("")
        const blobAddress = ref("")
        const reactiveObject = reactive({
            currentTime: 0,
            duration: 0,
            playbackRate: 1,
            isPlaying: false
        })

        const isPlaying = () => {
            return audioElement.value?.played ?? false
        }

        const play = () => {
            audioElement.value?.play()
        }

        const stop = () => {
            audioElement.value?.pause()
            console.log(audioElement.value)
        }

        const currentTime = () => {
            return audioElement.value?.currentTime ?? -1
        }

        const duration = () => {
            return audioElement.value?.duration ?? 0
        }

        const playbackRate = () => {
            return audioElement.value?.playbackRate ?? 1
        }

        const convertTime = function (time_position: number) {
            if (time_position == null) return "0:00"

            time_position = Math.floor(time_position);
            let res: string;

            if (60 <= time_position) {
                res = String(Math.floor(time_position / 60)) + ":";
                res += Math.floor(time_position % 60).toString().padStart(2, '0');
            } else {
                res = "0:" + Math.floor(time_position % 60).toString().padStart(2, '0');
            }

            return res;
        };

        watch(address, async (newAddress) => {
            const response = await fetch(import.meta.env.MODE === "development" ? "http://localhost:10000/api/proxy?url=" + newAddress : "/api");
            const blob = await response.blob();
            if (blobAddress.value != null) URL.revokeObjectURL(blobAddress.value)
            blobAddress.value = URL.createObjectURL(blob);
            audioElement.value = new Audio(blobAddress.value);
            audioElement.value?.setAttribute("src", blobAddress.value);
        })

        const setPlayBackRate = (value: number) => {
            if (audioElement.value?.playbackRate != null) {
                audioElement.value.playbackRate = value
            }
        }

        const setCurrentTime = (value: number) => {
            if (audioElement.value?.currentTime != null) {
                audioElement.value.currentTime = value;
            }
        }

        return {
            address,
            blobAddress,
            play,
            stop,
            convertTime,
            playbackRate,
            setPlayBackRate,
            setCurrentTime,
            isPlaying,
            duration,
            currentTime,
            reactiveObject
        }
    }
})

function emits(arg0: string, value: number | undefined) {
    throw new Error("Function not implemented.")
}
</script>

<style scoped>
.address {
    width: 1000px;
}
</style>