<template>
  <Container>
    <main>
      <h1 className="mainTitle mt-6 mb-6">
        Adding words to: {{ vocabulary.name }}
      </h1>
      <WordsForm :action="addWord" :btnLabel="'Add'" :redirect="false" />
    </main>
  </Container>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router"
import Container from "../components/Container.vue"
import { getVocabulary } from "../helpers/getVocabulary"
import WordsForm from "../components/WordsForm.vue"
import { useStore } from "../store"

const route = useRoute()
const store = useStore()

const id = route.params.id as string
const vocabulary = getVocabulary(id)

const addWord = (word: string, translation: string) => {
  store.commit("addWord", { word, translation, vocabularyId: id })
}
</script>
