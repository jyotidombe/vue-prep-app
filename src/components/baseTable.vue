<script setup lang="ts">
interface Column {
  key: string
  label: string
}

interface Props {
  columns: Column[]
  rows: Record<string, any>[]
}

defineProps<Props>()
</script>

<template>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th v-for="col in columns" :key="col.key">
          {{ col.label }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="(row, index) in rows"
        :key="index"
      >
        <td
          v-for="col in columns"
          :key="col.key"
        >
          {{ row[col.key] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>