<script setup lang="ts">
import {RouterLink} from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import TitleBar from "./components/TitleBar.vue";</script>

<template>
    <TitleBar/>
    <header>
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125"/>

        <div class="wrapper">
            <HelloWorld msg="You did it!!!!"/>
            <p>AAAAA</p>

            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
            </nav>
        </div>
    </header>
    <RouterView class="router"/>
</template>

<style scoped>

</style>
