<template>
  <main class="container py-4">
    <!-- PAGE TITLE -->
    <div class="mb-4">
      <h1 class="fw-bold text-primary">Task Management</h1>
      <p class="text-muted mb-0">
        Create, update, and manage tasks easily.
      </p>
    </div>

    <!-- CREATE TASK -->
    <div class="card shadow-sm mb-4">
      <div class="card-header bg-primary text-white">
        Create Task
      </div>

      <div class="card-body">
        <TaskForm @submit="handleCreate" />
      </div>
    </div>

    <!-- TASK LIST -->
    <div class="card shadow-sm">
      <div class="card-header bg-dark text-white">
        Task List
      </div>

      <div class="card-body p-0">
        <ul class="list-group list-group-flush">
          <li
            v-for="task in taskStore.tasks"
            :key="task.id"
            class="list-group-item"
          >
            <!-- EDIT MODE -->
            <TaskForm
              v-if="editingTask?.id === task.id"
              :task="editingTask"
              @submit="handleUpdate"
            />

            <!-- NORMAL VIEW -->
            <div
              v-else
              class="d-flex justify-content-between align-items-start flex-wrap gap-3"
            >
              <!-- TASK DETAILS -->
              <div>
                <p class="mb-1 fw-semibold">
                  {{ task.title }}
                </p>

                <p class="mb-1 text-muted">
                  {{ task.description }}
                </p>

                <span class="badge bg-info text-dark">
                  Assigned to: {{ task.assignedTo }}
                </span>
              </div>

              <!-- ACTION BUTTONS -->
              <div class="d-flex gap-2">
                <button
                  class="btn btn-sm btn-warning"
                  @click="startEdit(task)"
                >
                  Edit
                </button>

                <button
                  class="btn btn-sm btn-danger"
                  @click="handleDelete(task.id)"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>

          <!-- EMPTY STATE -->
          <li
            v-if="!taskStore.tasks.length"
            class="list-group-item text-center text-muted py-4"
          >
            No tasks available.
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTaskStore } from '../store/task'
import TaskForm from '../components/taskForm.vue'
import type { TaskData } from '../types/task'

const taskStore = useTaskStore()
const editingTask = ref<TaskData | null>(null)

onMounted(() => {
  taskStore.getTasks()
})

const handleCreate = async (taskData: Omit<TaskData, 'id'>) => {
  await taskStore.createTask(taskData)
}

const startEdit = (task: TaskData) => {
  editingTask.value = { ...task }
}

const handleUpdate = async (taskData: Omit<TaskData, 'id'>) => {
  if (!editingTask.value) return

  await taskStore.updateTask(editingTask.value.id, taskData)
  editingTask.value = null
}

const handleDelete = async (id: string) => {
  await taskStore.deleteTask(id)
}
</script>