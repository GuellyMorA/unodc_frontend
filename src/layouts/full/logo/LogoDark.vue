<script setup lang="ts">
import { RouterLink } from 'vue-router';
import logo from '@/assets/images/logos/logo-pol-nal.png';
</script>
<template>
    <div class="logo">
        <RouterLink to="/">
            <img :src="logo" alt="home" style="width: 20%"/>
        </RouterLink>
        <h3  >Sistema de denuncias</h3>
    </div>
</template>
<!--
<style>
.custom-green-btn-side {
  background-color: #073d09; /* Verde */
  color: white; /* Texto en blanco */
}
</style>  -->

