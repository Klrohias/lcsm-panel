<script setup lang="ts">
import '@/utils/sign-in-required'

import DefaultDocument from '@/components/DefaultDocument.vue'
import DefaultLayout from '@/components/DefaultLayout.vue'
import { listInstances, listRunners, type Instance, type Runner } from '@/utils/api';
import { NSelect, NSpace, NCard, NButton, NDescriptions, NDescriptionsItem, NPageHeader, NGi, NGrid, NStatistic, NTag } from 'naive-ui';
import { computed, onMounted, ref } from 'vue';

const runners = ref<Runner[]>([])
const instances = ref<Instance[]>([])
const selectedRunnerId = ref<number>(0)

const runnerOptions = computed(() => runners.value
  .map(runner => ({ label: runner.name, value: runner.id })))

async function reloadRunners() {
  runners.value = await listRunners()
  reloadInstances(runners.value?.[0].id ?? 0)
}

async function reloadInstances(runnerId: number) {
  selectedRunnerId.value = runnerId
  instances.value = await listInstances(selectedRunnerId.value)
}

onMounted(async () => {
  await reloadRunners()
})

</script>

<template>
  <default-layout>
    <default-document>
      <n-page-header title="实例管理" subtitle="在此对实例进行管理" style="margin-bottom: 4rem;">
        <template #extra>
          <n-select :options="runnerOptions" :value="selectedRunnerId" v-on:update:value="reloadInstances"
            style="width: 12rem;" />
        </template>

        <n-grid :cols="4">
          <n-gi>
            <n-statistic label="实例总数" :value="instances.length" />
          </n-gi>
          <n-gi>
            <n-statistic label="运行实例数" :value="0" />
          </n-gi>
          <n-gi>
            <n-statistic label="总占用内存" value="0MB" />
          </n-gi>
        </n-grid>
      </n-page-header>


      <n-space justify="center" size="small">
        <n-card v-for="instance in instances" v-bind:key="instance.id" :title="instance.name" style="width: 24rem;">
          <template #header-extra>
            <n-tag type="error">
              停止
            </n-tag>
          </template>
          <n-descriptions size="small">
            <n-descriptions-item label="到期时间">
              没做
            </n-descriptions-item>
            <n-descriptions-item label="类型">
              没做
            </n-descriptions-item>
          </n-descriptions>
          <n-button>管理</n-button>
        </n-card>
      </n-space>
    </default-document>
  </default-layout>
</template>