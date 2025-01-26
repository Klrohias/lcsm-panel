<script setup lang="ts">
import DefaultDocument from '@/components/DefaultDocument.vue'
import DefaultLayout from '@/components/DefaultLayout.vue'
import { NCard, NSpace, useMessage } from 'naive-ui'
import coverImg from '@/assets/minecraft-1970876_1280.jpg'
import UserEditor from '@/components/users/UserEditor.vue'
import { createUser, type User } from '@/api'
import { router } from '@/router'

const message = useMessage()
async function onSaveInitialUser(user: User) {
  try {
    await createUser(user)
    router.replace('/signIn')
  } catch (err) {
    message.error('初始化失败')
  }
}

</script>

<template>

  <default-layout embedded>
    <default-document>
      <n-space justify="center" size="small">
        <n-card title="LCSM 初始化" style="max-width: 24rem;">
          <template #cover>
            <img :src="coverImg">
          </template>
          <user-editor @save="onSaveInitialUser" />
        </n-card>
      </n-space>
    </default-document>
  </default-layout>
</template>