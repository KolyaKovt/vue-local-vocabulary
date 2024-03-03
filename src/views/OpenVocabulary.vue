<template>
  <Container>
    <Header :full="true">
      <p class="mainTitle mb-6">{{ name }} (count: {{ firstLang.length }})</p>
      <ul class="btnContainer">
        <li>
          <RouterLink class="btn btn-secondary" to="/">Cancel</RouterLink>
        </li>
        <li>
          <RouterLink class="btn btn-success" :to="`${id}/add`">
            Add words
          </RouterLink>
        </li>
        <li>
          <RouterLink
            class="btn btn-primary"
            :to="`${id}/play/connecting-words`"
          >
            Play connecting words
          </RouterLink>
        </li>
        <li>
          <RouterLink class="btn btn-dark" :to="`${id}/play/guessing-words`">
            Play guessing word
          </RouterLink>
        </li>
      </ul>
    </Header>

    <main>
      <section>
        <h1 class="visually-hidden">Words list</h1>
        <ul class="itemsList">
          <li
            class="container-for-word-pairs"
            v-for="(word, index) in firstLang"
            :key="wordsIds[index]"
          >
            <div class="wordPairs">
              <div class="word">{{ word }}</div>
              <div class="word">{{ secLang[index] }}</div>
            </div>
            <div class="btnContainer">
              <RouterLink
                class="btn btn-primary"
                :to="`${id}/change/${wordsIds[index]}`"
              >
                Change
              </RouterLink>
              <button
                class="btn btn-danger"
                type="button"
                @click="() => confirmDelete(id, wordsIds[index], word)"
              >
                Delete
              </button>
            </div>
          </li>
        </ul>
      </section>
    </main>
  </Container>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router"
import Container from "../components/Container.vue"
import { getVocabulary } from "../helpers/getVocabulary"
import Header from "../components/Header.vue"
import { useToast } from "vue-toastification"
import ConfirmationToast from "../components/ConfirmationToast.vue"
import { useStore } from "../store"

const route = useRoute()
const toast = useToast()
const store = useStore()

const id = route.params.id as string

const confirmDelete = (vocabularyId: string, wordId: string, word: string) => {
  toast({
    component: ConfirmationToast,
    props: {
      message: `Are you sure you want to delete "${word}"?`,
      onConfirm: () => {
        store.commit("deleteWord", { vocabularyId, wordId })
      },
    },
  })
}

const { firstLang, secLang, name, wordsIds } = getVocabulary(id)
</script>
