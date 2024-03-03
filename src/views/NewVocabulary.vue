<template>
  <Container>
    <main>
      <section>
        <h1 class="mainTitle mt-6 mb-6">New vocabulary</h1>
        <VocabularyForm
          :action="addVocabulary"
          :btnLabel="'Add'"
          :redirect="false"
        />
      </section>
    </main>
  </Container>
</template>

<script setup lang="ts">
import Container from "../components/Container.vue"
import VocabularyForm from "../components/VocabularyForm.vue"
import { useStore } from "../store"

const store = useStore()

const addVocabulary = (name: string) => store.commit("addVocabulary", name)
</script>
