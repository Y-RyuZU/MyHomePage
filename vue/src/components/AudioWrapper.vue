<template>
    <audio ref="audioElement" @play="isPlay = true" @pause="isPlay = false"></audio>
</template>

<script setup lang="ts">
import {computed, ref, watch} from "vue";

const props = defineProps<{
    isPlay: boolean
}>();

const emits = defineEmits<{
    (event: "update:isPlay", value: boolean): void
}>();

const audioElement = ref<HTMLAudioElement | null>(null)

const isPlay = computed({
    get: () => props.isPlay,
    set: (value) => emits("update:isPlay", value)
})

const convertedCurrentTime = () => {
    return convertTime(audioElement.value?.currentTime ?? 0)
}

const convertedDuration = () => {
    return convertTime(audioElement.value?.duration ?? 0)
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

watch(isPlay, (value) => {
    if (value) {
        audioElement.value?.play()
    } else {
        audioElement.value?.pause()
    }
})

defineExpose({
    convertedCurrentTime,
    convertedDuration
})
</script>

<style scoped>

</style>