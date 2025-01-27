<script setup lang="ts">
import DefaultDocument from '@/components/DefaultDocument.vue'
import DefaultLayout from '@/components/DefaultLayout.vue'
import { router } from '@/router';
import { NResult, NButton } from 'naive-ui'

function goBack() {
  router.back()
}
</script>

<template>
  <default-layout>
    <default-document>
      <n-result status="404" title="404 资源不存在" description="这里是...一片虚空？">
        <template #footer>
          <n-button @click="goBack">重生至上一页</n-button>
        </template>
      </n-result>
    </default-document>
  </default-layout>
</template>
