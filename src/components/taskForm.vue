<script setup lang="ts">
import { ref, watch } from 'vue'
import type { TaskData } from '../types/task'

const props = defineProps<{
  task?: TaskData | null
}>()

const emit = defineEmits<{
  (e: 'submit', value: Omit<TaskData, 'id'>): void
}>()

// Local form state
const form = ref<Omit<TaskData, 'id'>>({
  title: '',
  description: '',
  assignedTo: ''
})

// If editing → populate form
watch(
  () => props.task,
  (newTask) => {
    if (newTask) {
      form.value = {
        title: newTask.title,
        description: newTask.description,
        assignedTo: newTask.assignedTo
      }
    }
    else{
        form.value = {
            title: '',
            description: '',
            assignedTo: ''
        }
    }
  },
  { immediate: true }
)

const handleSubmit = () => {
  emit('submit', form.value)
  console.log('Form submitted with:', form.value);

  // reset after create
  if (!props.task) {
    form.value = {
      title: '',
      description: '',
      assignedTo: ''
    }
  }
}
</script>

<template>
  <div>
    <input v-model="form.title" placeholder="Title" />
    <input v-model="form.description" placeholder="Description" />
    <input v-model="form.assignedTo" placeholder="Assign To" />

    <button @click="handleSubmit">
      {{ props.task ? 'Update' : 'Create' }}
    </button>
  </div>
</template>
