<template>
  <Container>
    <Header :full="true">
      <div class="flex justify-between items-center mb-4">
        <p class="mainTitle">{{ name }} (count: {{ firstLang.length }})</p>

        <Menu>
          <li>
            <RouterLink to="/">Vocabularies</RouterLink>
          </li>
          <li>
            <RouterLink :to="`${id}/add`">Add words</RouterLink>
          </li>
          <li>
            <RouterLink :to="`${id}/play/connecting-words`">
              Play connecting words
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="`${id}/play/guessing-words`">
              Play guessing word
            </RouterLink>
          </li>
        </Menu>
      </div>

      <ul class="btnContainer">
        <li>
          <button
            class="btn btn-secondary btn-sm"
            type="button"
            @click="confirmDelete"
            :disabled="!btnsActive"
          >
            Delete
          </button>
        </li>
        <li>
          <button
            class="btn btn-primary btn-sm"
            type="button"
            @click="activateMoveWords"
            :disabled="!btnsActive"
          >
            Move
          </button>
        </li>
        <li>
          <button
            class="btn btn-danger btn-sm"
            type="button"
            @click="toggleSelected"
          >
            {{ isEveythingSelected ? "Clear" : "Select" }} all
          </button>
        </li>
      </ul>
    </Header>

    <main>
      <section>
        <h1 class="visually-hidden">Words list</h1>
        <ul class="itemsList">
          <li
            class="container-for-word-pairs flex justify-between gap-2"
            v-for="(word, index) in firstLang"
            :key="wordsIds[index]"
          >
            <div
              class="wordPairs cursor-pointer"
              @click="() => router.push(`/${id}/change/${wordsIds[index]}`)"
            >
              <div class="word w-[50%]">{{ word }}</div>
              <div class="word w-[50%]">{{ secLang[index] }}</div>
            </div>

            <input
              class="cursor-pointer"
              type="checkbox"
              :value="index"
              v-model="selectedWords"
            />
          </li>
        </ul>
      </section>
    </main>
  </Container>

  <div
    class="fixed top-0 w-[100%] h-[100vh] bg-[#00000062] flex justify-center items-center"
    v-if="moveWords"
    @click="
      e => {
        if (e.target === e.currentTarget) moveWords = false
      }
    "
  >
    <div class="w-[300px] h-[300px] bg-[white] rounded-lg p-4 overflow-y-auto">
      <ul class="flex flex-col gap-2">
        <li
          class="text-2xl text-[black] cursor-pointer"
          v-for="{ name, id } in vocabularies"
          @click="() => moveWordsTo(id)"
        >
          {{ name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from "vue-router"
import { ref, watchEffect } from "vue"

import Container from "../components/Container.vue"
import Header from "../components/Header.vue"
import Menu from "../components/Menu.vue"

import { getVocabulary } from "../helpers/getVocabulary"
import { useStore } from "../store"
import { confirm } from "../helpers/confirm"

const route = useRoute()
const store = useStore()
const router = useRouter()

const id = route.params.id as string

const { firstLang, secLang, name, wordsIds } = getVocabulary(id)

const vocabularies = store.state.vocabularies.filter(voc => voc.id !== id)

const selectedWords = ref<number[]>([])

const deleteSelected = () => {
  selectedWords.value.forEach(wordIndex => {
    store.commit("deleteWord", {
      vocabularyId: id,
      wordId: wordsIds[wordIndex],
    })
  })

  selectedWords.value = []
}

const confirmDelete = () =>
  confirm(
    `Are you sure you want to delete ${selectedWords.value.length} words?`,
    () => deleteSelected()
  )

const moveWords = ref(false)

const activateMoveWords = () => {
  moveWords.value = true
}

const moveWordsTo = (id: string) => {
  selectedWords.value.forEach(wordIndex => {
    store.commit("addWord", {
      vocabularyId: id,
      word: firstLang[wordIndex],
      translation: secLang[wordIndex],
    })
  })

  deleteSelected()

  moveWords.value = false
}

const isEveythingSelected = ref(false)

watchEffect(() => {
  isEveythingSelected.value = selectedWords.value.length === firstLang.length
  console.log(isEveythingSelected.value)
})

const toggleSelected = () => {
  if (isEveythingSelected.value) selectedWords.value = []
  else selectedWords.value = firstLang.map((_, i) => i)
}

const btnsActive = ref(false)

watchEffect(() => {
  btnsActive.value = selectedWords.value.length !== 0
})
</script>
