<template>
  <form @submit.prevent="submit">
    <div class="form-control">
      <label class="label">
        <span class="label-text">Name</span>
      </label>
      <input
        class="input input-bordered"
        type="text"
        placeholder="..."
        autoComplete="off"
        v-model="name"
        required
      />
    </div>
    <div class="btnContainer mt-6">
      <RouterLink class="btn btn-secondary" to="/">Cancel</RouterLink>
      <button class="btn btn-primary">{{ btnLabel }}</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { RouterLink, useRouter } from "vue-router"

const router = useRouter()

const { action, btnLabel, redirect, previous } = defineProps<{
  action: (name: string) => void
  btnLabel: string
  redirect: boolean
  previous?: string
}>()

const name = ref(previous ? previous : "")

const submit = () => {
  action(name.value)
  name.value = ""
  if (redirect) router.push("/")
}
</script>
