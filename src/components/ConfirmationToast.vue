<template>
  <div>
    <p class="mb-2">{{ message }}</p>

    <div class="btnContainer">
      <button class="btn btn-sm btn-primary" @click="onConfirm()">Yes</button>
      <button class="btn btn-sm btn-secondary">No</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { message, onConfirm } = defineProps<{
  message: string
  onConfirm: () => void
}>()
</script>
