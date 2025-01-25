<script setup lang="ts">
import '@/utils/sign-in-required'
import { listRunners, type Runner } from '@/utils/api'
import DefaultDocument from '@/components/DefaultDocument.vue'
import DefaultLayout from '@/components/DefaultLayout.vue'
import { type DataTableColumns, NDataTable } from 'naive-ui'
import { ref } from 'vue'

const columns: DataTableColumns<Runner> = [
  {
    title: 'Id',
    key: 'id'
  },
  {
    title: 'Uri',
    key: 'socketUri'
  },
  {
    title: 'Desc',
    key: 'description'
  }
];

const data = ref<Runner[]>([]);

(async () => {
  data.value = await listRunners();
})();
</script>

<template>
  <default-layout>
    <default-document>
      <n-data-table :columns="columns" :data="data" :bordered="false" />
    </default-document>
  </default-layout>
</template>
