<script setup lang="ts">
import Container from "./Container.vue"
import VocabularyForm from "./VocabularyForm.vue"

const addVocabulary = (name: string) => {
  console.log(`the name is ${name}`)
}
</script>

<template>
  <Container>
    <main>
      <section>
        <h1 class="mainTitle mt-6 mb-6">New vocabulary</h1>
        <VocabularyForm :action="addVocabulary" :btnLabel="'Add'" :redirect="false" />
      </section>
    </main>
  </Container>
</template>
