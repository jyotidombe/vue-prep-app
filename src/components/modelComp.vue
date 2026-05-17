<script setup lang="ts">
interface Props {
  show: boolean
  title: string
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <div
    v-if="show"
    class="modal d-block"
    tabindex="-1"
  >
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <h5 class="modal-title">
            {{ title }}
          </h5>

          <button
            class="btn-close"
            @click="emit('close')"
          />
        </div>

        <div class="modal-body">
          <slot />
        </div>

        <div class="modal-footer">
          <slot name="footer" />
        </div>

      </div>
    </div>
  </div>
</template>