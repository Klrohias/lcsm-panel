<script setup lang="tsx">
import { useLoadingBar } from 'naive-ui';
import { events } from './router';

const loadingBar = useLoadingBar();

events.addEventListener('beginLoading', () => {
    loadingBar.start();
});

events.addEventListener('endLoading', () => {
    loadingBar.finish();
});

</script>

<template>
    <router-view />
</template>