<script setup lang="tsx">
import DefaultDocument from '@/components/DefaultDocument.vue'
import DefaultLayout from '@/components/DefaultLayout.vue'
import RunnersList from '@/components/runners/RunnersList.vue'
import { createRunner, deleteRunner, updateRunner, type Runner } from '@/api'
import { useDialog, NButton } from 'naive-ui'
import RunnerEditor from '@/components/runners/RunnerEditor.vue'
import { onMounted, toRaw, useTemplateRef } from 'vue'
import { signInRequired } from '@/utils/signInRequired'
import { compareObject } from '@/utils/jsonPatch'

const dialog = useDialog()

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
