<script setup lang="ts">
import { ref } from 'vue';
import { NForm, NFormItem, NInput, NButton, NSpin, NSelect } from 'naive-ui'
import { SocketType, type Runner } from '@/utils/api';

const props = defineProps<{
  runner?: Runner
}>();

const emits = defineEmits<{
  (e: 'save', runner: Runner): Promise<any>
}>();

const formRule = {
  name: {
    required: true,
    trigger: ['blur'],
    message: '节点名称不能留空'
  }
}

const socketTypeOptions = [
  { label: 'WebSocket', value: SocketType.WebSocket },
  { label: '内置', value: SocketType.Builtin }
]

const formValue = ref<Runner>(props.runner ?? {
  name: '',
  id: 0,
  socketType: 0,
  description: '',
  socketUri: ''
})

const loading = ref(false)

async function saveAction() {
  loading.value = true

  await emits('save', formValue.value)

  loading.value = false
}
</script>

<template>
  <n-spin :show="loading">
    <n-form :model="formValue" :rules="formRule" ref="formRef">
      <n-form-item path="name" label="节点名称">
        <n-input v-model:value="formValue.name" placeholder="在此输入节点名称" />
      </n-form-item>

      <n-form-item path="socketType" label="连接类型">
        <n-select v-model:value="formValue.socketType" :options="socketTypeOptions" />
      </n-form-item>

      <n-form-item path="socketUri" label="连接地址">
        <n-input v-model:value="formValue.socketUri" placeholder="在此输入节点连接地址，内置节点可留空" />
      </n-form-item>

      <n-form-item path="description" label="描述">
        <n-input type="textarea" v-model:value="formValue.description" placeholder="在此输入节点描述，可留空" />
      </n-form-item>

      <n-form-item>
        <n-button type="primary" size="large" block @click="saveAction">
          保存
        </n-button>
      </n-form-item>
    </n-form>
  </n-spin>
</template>