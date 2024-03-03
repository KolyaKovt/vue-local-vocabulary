<template>
  <Container>
    <main>
      <h1 className="mainTitle mt-6 mb-6">
        Changing words in: {{ vocabulary.name }}
      </h1>
      <WordsForm
        :action="changeWord"
        :btnLabel="'Change'"
        :redirect="true"
        :previous="[word, translation]"
      />
    </main>
  </Container>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router"
import Container from "../components/Container.vue"
import WordsForm from "../components/WordsForm.vue"
import { getVocabulary } from "../helpers/getVocabulary"
import { useStore } from "../store"

const route = useRoute()
const store = useStore()

const vocabularyId = route.params.id as string
const wordId = route.params.wordId as string

const vocabulary = getVocabulary(vocabularyId)

const changeWord = (word: string, translation: string) => {
  store.commit("changeWord", { vocabularyId, wordId, word, translation })
}

const ind = vocabulary.wordsIds.indexOf(wordId)

const word = vocabulary.firstLang[ind]
const translation = vocabulary.secLang[ind]
</script>
