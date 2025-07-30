<script setup lang="ts">
import { RouterLink } from 'vue-router';
import logo from '@/assets/images/logos/logo-pol-nal.png';
</script>
<template>
    <v-row class="p-0 py-0 px-2 ml-2">
        <v-col cols="10" class="p-0 py-2 px-0">
            <span > Sistema de denuncias </span>
        </v-col>
        <v-col cols="2" class="p-0 py-0 px-0">
            <div class="logo">
                <RouterLink to="/">
                    <img :src="logo" alt="home" style="width: 100%" />
                </RouterLink>

            </div>
        </v-col>
   
    </v-row>
</template>
<!--
<style>
.custom-green-btn-side {
  background-color: #073d09; /* Verde */
  color: white; /* Texto en blanco */
}
</style>  -->

