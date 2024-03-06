<template>
  <Container>
    <Header :full="true">
      <div class="flex justify-between items-center">
        <p class="mainTitle">{{ name }} (count: {{ firstLang.length }})</p>

        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn m-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-5 h-5 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </div>
          <ul
            tabindex="0"
            class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
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
          </ul>
        </div>
      </div>
    </Header>

    <main>
      <section class="pt-16">
        <ul class="btnContainer" v-if="selectedWords.length !== 0">
          <li>
            <button
              class="btn btn-secondary btn-sm"
              type="button"
              @click="confirmDelete"
            >
              Delete
            </button>
          </li>
          <li>
            <button
              class="btn btn-primary btn-sm"
              type="button"
              @click="activateMoveWords"
            >
              Move
            </button>
          </li>
          <li>
            <button
              class="btn btn-danger btn-sm"
              type="button"
              @click="selectAll"
            >
              Select all
            </button>
          </li>
        </ul>

        <h1 class="visually-hidden">Words list</h1>
        <ul class="itemsList">
          <li
            class="container-for-word-pairs"
            v-for="(word, index) in firstLang"
            :key="wordsIds[index]"
          >
            <div class="wordPairs">
              <div class="word w-[50%]">{{ word }}</div>
              <div class="word w-[50%]">{{ secLang[index] }}</div>

              <input
                type="checkbox"
                :value="index"
                v-model="selectedWords"
                v-if="selectedWords.length !== 0"
              />

              <div class="dropdown dropdown-end" v-else>
                <div tabindex="0" role="button" class="btn m-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="inline-block w-5 h-5 stroke-current"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </div>
                <ul
                  tabindex="0"
                  class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <RouterLink :to="`${id}/change/${wordsIds[index]}`">
                      Change
                    </RouterLink>
                  </li>
                  <li>
                    <button
                      type="button"
                      @click="
                        () => {
                          selectedWords.push(index)
                        }
                      "
                    >
                      Select
                    </button>
                  </li>
                </ul>
              </div>
            </div>
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
    <div class="w-[300px] h-[200px] bg-white rounded-lg">
      <ul>
        <li v-for="{ name, id } in vocabularies" @click="() => moveWordsTo(id)">
          {{ name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router"
import Container from "../components/Container.vue"
import { getVocabulary } from "../helpers/getVocabulary"
import Header from "../components/Header.vue"
import { useStore } from "../store"
import { ref } from "vue"
import { confirm } from "../helpers/confirm"

const route = useRoute()
const store = useStore()

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

const selectAll = () => {
  if (selectedWords.value.length !== firstLang.length)
    selectedWords.value = firstLang.map((_, i) => i)
  else selectedWords.value = []
}
</script>
