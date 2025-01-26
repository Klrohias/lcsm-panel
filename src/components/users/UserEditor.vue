<script setup lang="ts">
import type { User } from '@/api'
import { ref, useTemplateRef } from 'vue'
import { NForm, NFormItem, NInput, NButton, NSpin } from 'naive-ui'

const props = withDefaults(defineProps<{
  user?: User,
  validate?: boolean
}>(), {
  validate: true
})

const emits = defineEmits<{
  (e: 'save', user: User): Promise<any>
}>()

interface UserUpdateForm {
  username: string,
  password: string,
  passwordRepeat: string,
}

const formRule = {
  username: {
    required: true,
    message: '请输入用户名',
    trigger: ['blur']
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: ['blur']
  },
  passwordRepeat: {
    required: true,
    message: '请再次输入密码',
    trigger: ['blur'],
  }
}

const formValue = ref<UserUpdateForm>({
  username: props.user?.username ?? '',
  password: '',
  passwordRepeat: ''
})
const formRef = useTemplateRef('formRef')
const loading = ref(false)

async function userUpdateAction() {
  if (props.validate) {
    try {
      await formRef?.value?.validate()
    } catch (err) {
      return
    }
  }

  loading.value = true

  const { username, password } = formValue.value
  emits('save', { id: props.user?.id ?? 0, username, password })

  loading.value = false
}

</script>

<template>
  <n-spin :show="loading">
    <n-form :model="formValue" :rules="formRule" ref="formRef">
      <n-form-item path="username" label="用户名">
        <n-input placeholder="在此输入用户名" v-model:value="formValue.username" />
      </n-form-item>
      <n-form-item path="password" label="密码">
        <n-input type="password" placeholder="在此输入密码" v-model:value="formValue.password" />
      </n-form-item>
      <n-form-item path="repeatPassword" label="重复密码">
        <n-input type="password" placeholder="在此重复输入密码" v-model:value="formValue.passwordRepeat" />
      </n-form-item>

      <n-form-item>
        <n-button type="primary" size="large" block @click="userUpdateAction">
          确认
        </n-button>
      </n-form-item>
    </n-form>
  </n-spin>
</template>