<template>
        <v-system-bar>
            <v-spacer></v-spacer>

            <v-icon>mdi-square</v-icon>

            <v-icon>mdi-circle</v-icon>

            <v-icon>mdi-triangle</v-icon>
        </v-system-bar>

        <v-app-bar>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>Application</v-toolbar-title>
        </v-app-bar>

        <v-navigation-drawer
            v-model="drawer"
            rail
            expand-on-hover
            temporary
        >
            <v-list density="compact" nav>
                <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
                <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
                <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
            </v-list>
        </v-navigation-drawer>

<!--        <v-main class="bg-grey-lighten-2">-->
<!--            <v-container>-->
<!--                <v-row>-->
<!--                    <template v-for="n in 4" :key="n">-->
<!--                        <v-col-->
<!--                            class="mt-2"-->
<!--                            cols="12"-->
<!--                        >-->
<!--                            <strong>Category {{ n }}</strong>-->
<!--                        </v-col>-->

<!--                        <v-col-->
<!--                            v-for="j in 6"-->
<!--                            :key="`${n}${j}`"-->
<!--                            cols="6"-->
<!--                            md="2"-->
<!--                        >-->
<!--                            <v-sheet height="150"></v-sheet>-->
<!--                        </v-col>-->
<!--                    </template>-->
<!--                </v-row>-->
<!--            </v-container>-->
<!--        </v-main>-->
</template>

<script setup lang="ts">
import {ref} from "vue";

const drawer = ref(false)
</script>

<style scoped lang="scss"></style>