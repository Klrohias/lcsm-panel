<script setup lang="ts">
import DefaultDocument from '@/components/DefaultDocument.vue'
import DefaultLayout from '@/components/DefaultLayout.vue'
import RunnersList from '@/components/runners/RunnersList.vue'
import { signInRequired } from '@/utils/signInRequired'
import { onMounted } from 'vue';

onMounted(() => {
  signInRequired()
})

</script>

<template>
  <default-layout>
    <default-document>
      <runners-list bordered />
    </default-document>
  </default-layout>
</template>
