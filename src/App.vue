<template>
  <Loader v-if="isLoading" />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router"
import { useStore } from "./store"
import { computed } from "vue"
import Loader from "./components/Loader.vue"

const store = useStore()
const isLoading = computed(() => store.state.isLoading)
</script>
