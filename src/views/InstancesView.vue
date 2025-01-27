<script setup lang="ts">
import DefaultDocument from '@/components/DefaultDocument.vue'
import DefaultLayout from '@/components/DefaultLayout.vue'
import { listInstances, listRunners, startInstance, terminateInstance, type InstanceDto, type Runner } from '@/api'
import { NSelect, NSpace, NCard, NButton, NDescriptions, NDescriptionsItem, NPageHeader, NGi, NGrid, NStatistic, NTag, useMessage, NButtonGroup, NPopconfirm } from 'naive-ui'
import { computed, onMounted, ref } from 'vue'
import { signInRequired } from '@/utils/signInRequired'

const runners = ref<Runner[]>([])
const instances = ref<InstanceDto[]>([])
const selectedRunnerId = ref<number>(0)
const message = useMessage()

const instanceCount = computed(() => instances.value.length);
const runningInstanceCount = computed(() => instances.value.filter(x => x.isRunning).length);
const runnerOptions = computed(() => runners.value
  .map(runner => ({ label: runner.name, value: runner.id })))

async function reloadRunners() {
  runners.value = await listRunners()
  reloadInstances(runners.value?.[0].id ?? 0)
}

async function reloadInstances(runnerId?: number) {
  try {
    if (runnerId !== void 0) {
      selectedRunnerId.value = runnerId
    }
    instances.value = await listInstances(selectedRunnerId.value)
  } catch (err) {
    message.error('该节点的实例列表加载失败')
  }
}

async function startOrStopInstance(instance: InstanceDto) {
  if (instance.isRunning) {
    await terminateInstance(selectedRunnerId.value, instance.id)
  } else {
    await startInstance(selectedRunnerId.value, instance.id)
  }

  await reloadInstances()
}

onMounted(async () => {
  signInRequired()
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
            <n-statistic label="实例总数" :value="instanceCount" />
          </n-gi>
          <n-gi>
            <n-statistic label="运行实例数" :value="runningInstanceCount" />
          </n-gi>
        </n-grid>
      </n-page-header>


      <n-space justify="center" size="small">
        <n-card v-for="instance in instances" v-bind:key="instance.id" :title="instance.name" style="width: 20rem;">
          <template #header-extra>
            <n-tag type="error" v-if="!instance.isRunning">
              停止
            </n-tag>
            <n-tag type="success" v-if="instance.isRunning">
              运行中
            </n-tag>
          </template>
          <n-descriptions size="small" :columns="2">
            <n-descriptions-item label="到期时间">
              没做
            </n-descriptions-item>
            <n-descriptions-item label="类型">
              没做
            </n-descriptions-item>
          </n-descriptions>

          <template #action>
            <n-button-group>
              <n-button>管理</n-button>
              <n-popconfirm positive-text="确认" negative-text="取消" @positive-click="startOrStopInstance(instance)">
                <template #trigger>
                  <n-button v-if="instance.isRunning">停止</n-button>
                  <n-button v-if="!instance.isRunning">启动</n-button>
                </template>
                确定要进行这一操作？
              </n-popconfirm>
              <n-button>编辑</n-button>
            </n-button-group>
          </template>
        </n-card>
      </n-space>
    </default-document>
  </default-layout>
</template>