<script setup lang="ts">
import DefaultDocument from '@/components/DefaultDocument.vue'
import DefaultLayout from '@/components/DefaultLayout.vue'
import { NForm, NFormItem, NInput, NCard, NSpace, NButton, NSpin } from 'naive-ui'
import coverImg from '@/assets/minecraft-1970876_1280.jpg'
import { ref, useTemplateRef } from 'vue'
import { signIn } from '@/utils/api'
import { router } from '@/router'

interface SignInForm {
  username: string,
  password: string
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
  }
}

const formValue = ref<SignInForm>({
  username: '',
  password: ''
})
const formRef = useTemplateRef('formRef')
const loading = ref(false)

async function signInAction() {
  try {
    await formRef?.value?.validate()
  } catch (e) {
    console.error(e)
    return
  }

  loading.value = true

  try {
    let { username, password } = formValue.value
    await signIn(username, password);

    router.replace('/')
  } catch (e) {
    loading.value = false
  }
}


</script>

<template>
  <default-layout>
    <default-document>
      <n-space justify="center" size="small">
        <n-spin :show="loading">
          <n-card title="LCSM 登录" style="max-width: 24rem;">
            <template #cover>
              <img :src="coverImg">
            </template>
            <n-form :model="formValue" :rules="formRule" ref="formRef">
              <n-form-item path="username" label="用户名">
                <n-input placeholder="在此输入用户名" v-model:value="formValue.username" />
              </n-form-item>
              <n-form-item path="password" label="密码">
                <n-input type="password" placeholder="在此输入密码" v-model:value="formValue.password" />
              </n-form-item>

              <n-form-item>
                <n-button type="primary" size="large" block @click="signInAction">
                  登录
                </n-button>
              </n-form-item>
            </n-form>
          </n-card>
        </n-spin>
      </n-space>
    </default-document>
  </default-layout>
</template>