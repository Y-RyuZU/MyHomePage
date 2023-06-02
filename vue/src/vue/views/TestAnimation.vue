<template>
  <div class="about">
    <img alt="Vue logo" class="logo" :class="{ 'logo-big': isLogoBig}" src="@/assets/logo.svg"/>
    <button @click="onClick">大きくする</button>
  </div>
</template>

<style>
.logo {
  width: 50px;
  height: 50px;
  transition: all 1s ease;
}

.logo.logo-big {
  width: 100px;
  height: 100px;
}
</style>

<script lang="ts">
import {defineComponent ,ref} from "vue";

export default defineComponent({
  setup(props,ctx) {
    const isLogoBig = ref(false)

    const onClick = () => {
      isLogoBig.value = true
      setTimeout(() => (isLogoBig.value = false), 3 * 1000);
    }

    return {
      isLogoBig,
      onClick
    }

  }
})

</script>
