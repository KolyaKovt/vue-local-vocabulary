<template>
  <form @submit.prevent="submit">
    <div class="form-control">
      <label class="label">
        <span class="label-text">Word</span>
      </label>
      <input
        class="input input-bordered"
        type="text"
        placeholder="..."
        autoComplete="off"
        v-model="word"
        required
      />
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Translation</span>
      </label>
      <input
        class="input input-bordered"
        type="text"
        placeholder="..."
        autoComplete="off"
        v-model="translation"
        required
      />
    </div>
    <div class="btnContainer mt-6">
      <RouterLink class="btn btn-secondary" :to="`/${id}`">Cancel</RouterLink>
      <button class="btn btn-primary">{{ btnLabel }}</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { RouterLink, useRoute, useRouter } from "vue-router"

const router = useRouter()
const route = useRoute()

const { action, btnLabel, redirect, previous } = defineProps<{
  action: (word: string, translation: string) => void
  btnLabel: string
  redirect: boolean
  previous?: [string, string]
}>()

const word = ref(previous ? previous[0] : "")
const translation = ref(previous ? previous[1] : "")

const id = route.params.id

const submit = () => {
  action(word.value, translation.value)
  word.value = ""
  translation.value = ""
  if (redirect) router.push(`/${id}`)
}
</script>
