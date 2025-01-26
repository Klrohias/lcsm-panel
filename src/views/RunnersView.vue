<script setup lang="tsx">
import DefaultDocument from '@/components/DefaultDocument.vue'
import DefaultLayout from '@/components/DefaultLayout.vue'
import RunnersList from '@/components/runners/RunnersList.vue'
import { createRunner, deleteRunner, updateRunner, type Runner } from '@/api'
import { useDialog, NButton, NPageHeader } from 'naive-ui'
import RunnerEditor from '@/components/runners/RunnerEditor.vue'
import { onMounted, toRaw, useTemplateRef } from 'vue'
import { signInRequired } from '@/utils/signInRequired'
import { compareObject } from '@/utils/jsonPatch'

const dialog = useDialog()
const runnersList = useTemplateRef('runners-list')

onMounted(() => {
  signInRequired()
})

function onEditRunner(runner: Runner) {
  const tempRunnerObject = structuredClone(toRaw(runner))

  let editorDialog = dialog.create({
    title: '编辑节点',
    content: () => (<RunnerEditor runner={tempRunnerObject} onSave={onSave} />),
    closeOnEsc: false,
    maskClosable: false,
  })

  async function onSave(newRunner: Runner) {
    try {
      await updateRunner(runner.id, compareObject(runner, newRunner))
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
      await deleteRunner(runner.id)
      await runnersList.value?.reloadList()
    },
  })
}

</script>

<template>
  <default-layout>
    <default-document>
      <n-page-header title="节点管理" subtitle="在此对节点进行管理" style="margin-bottom: 1rem;">
        <template #extra>
          <n-button type="primary" size="large" @click="onCreateRunner">
            添加节点
          </n-button>
        </template>
      </n-page-header>

      <runners-list allow-actions display-id display-socket-type display-socket-uri @edit="onEditRunner"
        @delete="onDeleteRunner" ref="runners-list" bordered />
    </default-document>
  </default-layout>
</template>
