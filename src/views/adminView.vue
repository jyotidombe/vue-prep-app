<script setup lang="ts">
import { onMounted } from 'vue'
import { useAdminStore } from '../store/admin'

import baseTable from '../components/baseTable.vue'

const admin = useAdminStore()

const userColumns = [
  { key: 'id', label: 'ID' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' }
]

const taskColumns = [
  { key: 'id', label: 'ID' },
  { key: 'title', label: 'Title' },
  { key: 'assignedTo', label: 'Assigned To' }
]

onMounted(async () => {
  await admin.loadAdminData()
})
</script>

<template>
  <div class="admin">

    <h1>Admin Dashboard</h1>

    <!-- USERS TABLE -->
    <h2>Users ({{ admin.totalUsers }})</h2>
    <baseTable
      :columns="userColumns"
      :rows="admin.users"
    />

    <!-- TASKS TABLE -->
    <h2>Tasks ({{ admin.totalTasks }})</h2>
    <baseTable
      :columns="taskColumns"
      :rows="admin.tasks"
    />

  </div>
</template>