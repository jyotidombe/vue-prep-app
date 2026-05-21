<script setup lang="ts">
import { onMounted } from 'vue'
import { useAdminStore } from '../store/admin'

import baseTable from '../components/common/baseTable.vue'
import logoutBtn from '../components/common/logoutBtn.vue'

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
  <main class="container py-4">
    <!-- header -->
    <div class="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
      <div>
        <h1 class="fw-bold text-primary">Admin Dashboard</h1>
        <p class="text-muted mb-0">
          Manage users and tasks from a centralized location.
        </p>
      </div>
      <logoutBtn/>
    </div>

       <!-- STATS CARDS -->
    <section class="row gap-4 mb-5">
      <!-- USERS -->
      <div class="col-md-6">
        <div class="card bg-info text-white shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">Users ({{ admin.totalUsers }})</h5>
              <baseTable
                :columns="userColumns"
                :rows="admin.users"
              />
            <p class="card-text">
              View and manage all registered users in the system.
            </p>
          </div>
        </div>
      </div>
      <!-- TASKS -->
      <div class="col-md-6">
        <div class="card bg-success text-white shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">Tasks ({{ admin.totalTasks }})</h5>
              <baseTable
                :columns="taskColumns"
                :rows="admin.tasks"
              />
            <p class="card-text">
              View and manage all tasks in the system.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>