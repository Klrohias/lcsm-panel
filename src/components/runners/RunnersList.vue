<script setup lang="tsx">
import { listRunners, SocketType, type Runner } from '@/api'
import { type DataTableColumns, NDataTable, NButton } from 'naive-ui'
import { onMounted, ref } from 'vue';

const data = ref<Runner[]>([]);

const props = defineProps<{
  allowActions?: boolean,
  displaySocketUri?: boolean
  displaySocketType?: boolean,
  displayId?: boolean,
}>()

const emits = defineEmits<{
  edit: [runner: Runner],
  delete: [runner: Runner]
}>()

defineExpose({ reloadList })

const columns = ref<DataTableColumns<Runner>>([])

async function reloadList() {
  data.value = await listRunners();
}

onMounted(async () => {
  if (props.displayId) {
    columns.value.push({
      title: 'Id',
      key: 'id'
    })
  }


  columns.value.push({
    title: '名称',
    key: 'name'
  });

  if (props.displaySocketType) {
    columns.value.push({
      title: '连接类型',
      key: 'socketUri',
      render(rowData) {
        return rowData.socketType == SocketType.Builtin ? '内置' : 'WebSocket'
      },
    })
  }

  if (props.displaySocketUri) {
    columns.value.push({
      title: '连接地址',
      key: 'socketUri'
    })
  }

  columns.value.push({
    title: '描述',
    key: 'description'
  });

  if (props.allowActions) {
    columns.value.push({
      title: '操作',
      key: 'actions',
      render(rowData) {
        return (<span>
          <NButton size='small' strong={true} tertiary={true} onClick={() => emits('edit', rowData)}>编辑</NButton>
          <NButton size='small' strong={true} tertiary={true} type='error' onClick={() => emits('delete', rowData)}>删除</NButton>
        </span>)
      },
    })
  }

  await reloadList()
})

</script>

<template>
  <n-data-table :columns="columns" :data="data" :bordered="false" :scroll-x="1080" />
</template>