<template>
    <audio ref="audioElement"
           :src="src"
           @timeupdate="setCurrentTime($event.target.currentTime)"
           @loadedmetadata="duration = $event.target.duration"
    ></audio>
</template>

<script setup lang="ts">
import {computed, ref, watch} from "vue";

const props = defineProps<{
    isPlay: boolean
    currentTime: number
    duration: number
    playbackRate: number
    src: string
}>();

const emits = defineEmits<{
    (event: "update:isPlay", value: boolean): void,
    (event: "update:currentTime", value: number): void,
    (event: "update:duration", value: number): void,
    (event: "update:src", value: string): void,
    (event: "update:playbackRate", value: number): void,
    (event: "convertedCurrentTime", value: string): void,
    (event: "convertedDuration", value: string): void,
}>();

const audioElement = ref<HTMLAudioElement | null>(null)

const currentTime = computed({
    get: () => props.currentTime,
    set: (value: number) => {
        console.log("currentTime", value)
        if (audioElement.value != null) audioElement.value.currentTime = value
        emits("convertedCurrentTime", convertTime(value));
    }
})

const duration = computed({
    get: () => props.duration,
    set: (value: number) => {
        emits("update:duration", value)
        // convertedDuration.apply(value)
    }
})

const playbackRate = computed({
    get: () => props.playbackRate,
    set: (value: number) => {
        emits("update:playbackRate", value)
        if (audioElement.value != null) audioElement.value.playbackRate = value
    }
})

const isPlay = computed({
    get: () => props.isPlay,
    set: (value: boolean) => emits("update:isPlay", value)
})

const src = computed({
    get: () => props.src,
    set: (value: string) => {
        audioElement.value = new Audio(value);
        if (audioElement.value != null) emits("update:src", value)
    }
})

const convertedCurrentTime = () => emits("convertedCurrentTime", convertTime(currentTime.value))
const convertedDuration = () => emits("convertedDuration", convertTime(duration.value))

const convertTime = function (time_position: number) {
    if (!time_position) return "0:00"

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

const play = () => {
    audioElement.value?.play()
}

const stop = () => {
    audioElement.value?.pause()
}

watch(isPlay, (value: boolean) => {
    if (value) audioElement.value?.play()
    else audioElement.value?.pause()
})

watch(playbackRate, (value: number) => {
    if (audioElement.value != null) audioElement.value.playbackRate = value
})

watch(currentTime, (value: number) => {
    if (audioElement.value != null) audioElement.value.currentTime = value
    emits("convertedCurrentTime", convertTime(value));
})

const setCurrentTime = (value: number) => {
    console.log("setCurrentTime", value)
    // emits("update:currentTime", value);
    emits("convertedCurrentTime", convertTime(currentTime.value));
}


defineExpose({
    play,
    stop,
})
</script>

<style scoped>

</style>