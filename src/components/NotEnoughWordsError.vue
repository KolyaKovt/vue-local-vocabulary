<template>
  <div
    className="flex flex-col gap-4 items-center justify-center w-[100vw] h-[100vh] px-5"
  >
    <h1 className="text-center">
      The vocabulary must contain at least 4 words to play.
    </h1>

    <RouterLink className="btn btn-secondary" :to="`/${id}`"> Back </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router"

const route = useRoute()

const id = route.params.id as string
</script>
