<template>
  <Container>
    <main>
      <section>
        <h1 className="mainTitle mt-6 mb-6">Rename the vocabulary</h1>
        <VocabularyForm
          :action="renameVocabulary"
          :btnLabel="'Rename'"
          :redirect="true"
          :previous="previous"
        />
      </section>
    </main>
  </Container>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router"
import Container from "../components/Container.vue"
import VocabularyForm from "../components/VocabularyForm.vue"
import { getVocabulary } from "../helpers/getVocabulary"
import { useStore } from "vuex"

const route = useRoute()
const store = useStore()

const vocabulary = getVocabulary(route.params.id as string)
const previous = vocabulary.name

const renameVocabulary = (name: string) => {
  store.commit("renameVocabulary", { name, id: vocabulary.id })
}
</script>
