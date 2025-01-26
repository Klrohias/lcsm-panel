<script setup lang="ts">
import DefaultDocument from '@/components/DefaultDocument.vue'
import DefaultLayout from '@/components/DefaultLayout.vue'
import { NForm, NFormItem, NInput, NCard, NSpace, NButton, NSpin, useMessage } from 'naive-ui'
import coverImg from '@/assets/minecraft-1970876_1280.jpg'
import { ref, useTemplateRef } from 'vue'
import { signIn } from '@/api'
import { router } from '@/router'

const coverStyle = `url(${coverImg})`

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
const message = useMessage()
const formValue = ref<SignInForm>({
  username: '',
  password: ''
})
const formRef = useTemplateRef('formRef')
const loading = ref(false)

async function signInAction() {
  try {
    await formRef?.value?.validate()
  } catch (err) {
    return
  }

  loading.value = true

  try {
    let { username, password } = formValue.value
    await signIn(username, password);

    router.replace('/')
  } catch (err) {
    console.error(err)
    message.error('登录错误')
    loading.value = false
  }
}
</script>

<style lang="css" scoped>
.layout-bg {
  background-image: v-bind('coverStyle');
}

.layout-bg-blur {
  backdrop-filter: blur(8px);
}

.embedded-bg {
  background-color: transparent;
}
</style>

<template>
  <default-layout embedded>
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