<template>
  <div>{{ vocabularies }}</div>
</template>

<script setup lang="ts">
import { useStore } from "../store";

const store = useStore()

const vocabularies = store.state.vocabularies
</script>
