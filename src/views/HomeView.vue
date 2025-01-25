<script setup lang="tsx">
import '@/utils/sign-in-required'
import DefaultDocument from '@/components/DefaultDocument.vue'
import DefaultLayout from '@/components/DefaultLayout.vue'
import RunnersList from '@/components/RunnersList.vue'
import { createRunner, deleteRunner, updateRunner, type Runner } from '@/utils/api'
import { useDialog, NButton } from 'naive-ui'
import RunnerEditor from '@/components/RunnerEditor.vue'
import { toRaw, useTemplateRef } from 'vue'

const dialog = useDialog()
const runnersList = useTemplateRef('runners-list')

function onEditRunner(runner: Runner) {
  const tempRunnerObject = structuredClone(toRaw(runner))

  let editorDialog = dialog.create({
    title: '编辑节点',
    content: () => (<RunnerEditor runner={tempRunnerObject} onSave={onSave} />),
    closeOnEsc: false,
    maskClosable: false,
  })

  async function onSave(runner: Runner) {
    try {
      await updateRunner(runner)
      await runnersList.value?.reloadList()

      editorDialog.destroy();
    } catch (e) {
      console.log(e);
    }
  }
}

function onCreateRunner() {
  let editorDialog = dialog.create({
    title: '创建节点',
    content: () => (<RunnerEditor onSave={onSave} />),
    closeOnEsc: false,
    maskClosable: false,
  })

  async function onSave(runner: Runner) {
    try {
      await createRunner(runner)
      await runnersList.value?.reloadList()

      editorDialog.destroy();
    } catch (e) {
      console.log(e);
    }
  }
}

function onDeleteRunner(runner: Runner) {
  dialog.error({
    title: '删除节点',
    content: '确定要删除这个节点吗？',
    positiveText: '确定',
    negativeText: '不确定',
    async onPositiveClick(e) {
      await deleteRunner(runner)
      await runnersList.value?.reloadList()
    },
  })
}

</script>

<template>
  <default-layout>
    <default-document>
      <n-button type="primary" size="large" @click="onCreateRunner">
        添加节点
      </n-button>
      <runners-list allow-actions display-id display-socket-type display-socket-uri @edit="onEditRunner"
        @delete="onDeleteRunner" ref="runners-list" />
    </default-document>
  </default-layout>
</template>
