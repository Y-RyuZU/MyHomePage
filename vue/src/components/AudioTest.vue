<template>
    <div>
        <audio ref="audioElement" v-bind:src="blobAddress"></audio>
        <input v-model="address" class="address" placeholder="Audio address"/>
        <p>
            <time id="playback_position">{{ convertTime(progress) }}</time>
            <input type="range" v-model="progress" @input="setCurrentTime" v-bind:max="duration" min="0" step="1">
            <time id="end_position">{{ convertTime(duration) }}</time>
        </p>
        <button @click="play" v-bind:disabled="duration === 0">再生</button>
        <button @click="stop" v-bind:disabled="!isPlaying">停止</button>
        <input v-model="speed" @input="setPlayBackRate" min="0.25" max="16" step="0.05" type="range"/>
        <p>再生速度: {{ speed }}</p>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref, watch} from "vue"

export default defineComponent({
    setup(props, ctx) {
        const audioElement = ref<HTMLAudioElement | null>(null)
        const address = ref("")
        const blobAddress = ref("")
        const speed = ref(1)
        const progress = ref(0);
        const duration = ref(0)
        const isPlaying = ref(false)

        const play = () => {
            audioElement.value?.play()
        }

        const stop = () => {
            audioElement.value?.pause()
            console.log(audioElement.value)
        }

        const convertTime = function (time_position: number) {
            if (time_position == null) return "0:00"

            time_position = Math.floor(time_position);
            var res;

            if (60 <= time_position) {
                res = Math.floor(time_position / 60);
                res += ":" + Math.floor(time_position % 60).toString().padStart(2, '0');
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
            audioElement.value.currentTime = progress.value ?? 0;
            audioElement.value.ontimeupdate = () => {
                progress.value = audioElement.value?.currentTime ?? 0;
            }
            audioElement.value.onloadedmetadata = () => {
                duration.value = audioElement.value?.duration ?? 0;
            }
            audioElement.value.onplay = () => {
                isPlaying.value = true;
            }
            audioElement.value.onpause = () => {
                isPlaying.value = false;
            }
        })

        const setCurrentTime = () => {
            if (audioElement.value != null) {
                audioElement.value.currentTime = progress.value;
            }
        }

        const setPlayBackRate = () => {
            if (audioElement.value?.playbackRate != null) {
                audioElement.value.playbackRate = speed.value
            }
        }

        return {
            address,
            blobAddress,
            speed,
            play,
            stop,
            convertTime,
            setCurrentTime,
            setPlayBackRate,
            isPlaying,
            duration,
            progress
        }
    }
})
</script>

<style scoped>
.address {
    width: 1000px;
}
</style>