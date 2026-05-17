<template>
  <h1>Task Management</h1>

  <!-- CREATE TASK -->
  <TaskForm @submit="handleCreate" />

  <ul>
    <li v-for="task in taskStore.tasks" :key="task.id">
      <!-- Edit Form Only When Editing This Task -->
      <TaskForm
        v-if="editingTask?.id === task.id"
        :task="editingTask"
        @submit="handleUpdate"
      />

      <!-- Normal View -->
      <div v-else>
        <strong>{{ task.title }}</strong> - {{ task.description }} | Assigned to: {{ task.assignedTo }}
        <button @click="startEdit(task)">Edit</button>
        <button @click="handleDelete(task.id)">Delete</button>
      </div>
    </li>
  </ul>
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
  editingTask.value = {...task}
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
