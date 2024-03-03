<template>
  <header
    :class="`sticky ${
      full ? 'min-w-[100%]' : 'min-w-[280px]'
    } py-6 top-0 bg-gradient-to-b from-base-100 via-base-100 via-95% to-transparent`"
  >
    <slot></slot>
  </header>
</template>

<script setup lang="ts">
const { full } = defineProps<{
  full: boolean
}>()
</script>
