<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import { NForm, NFormItem, NInput, NButton, NSpin, NSelect } from 'naive-ui'
import { type Runner } from '@/api'

const props = withDefaults(defineProps<{
  runner?: Runner,
  validate?: boolean
}>(), {
  validate: true
})

const emits = defineEmits<{
  (e: 'save', runner: Runner): Promise<any>
}>()

const formRule = {
  name: {
    required: true,
    trigger: ['blur'],
    message: '节点名称不能留空'
  },
  authToken: {
    required: true,
    trigger: ['blur'],
    message: '节点密钥不可留空'
  }
}

const formValue = ref<Runner>(props.runner ?? {
  name: '',
  id: 0,
  description: '',
  endPoint: '',
  authToken: ''
})

const loading = ref(false)
const formRef = useTemplateRef('formRef')

async function saveAction() {
  if (props.validate) {
    try {
      await formRef?.value?.validate()
    } catch (err) {
      return
    }
  }

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

      <n-form-item path="endPoint" label="连接地址">
        <n-input v-model:value="formValue.endPoint" placeholder="在此输入节点连接地址" />
      </n-form-item>

      <n-form-item path="authToken" label="密钥">
        <n-input v-model:value="formValue.authToken" placeholder="在此输入节点的鉴权密钥" />
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