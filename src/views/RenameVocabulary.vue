<template>
  <Container>
    <main>
      <section>
        <h1 className="mainTitle mt-6 mb-6">Rename the vocabulary</h1>
        <VocabularyForm
          :action="renameVocabulary"
          :btnLabel="'Rename'"
          :redirect="true"
        />
      </section>
    </main>
  </Container>
</template>

<script setup lang="ts">
import Container from "../components/Container.vue"
import VocabularyForm from "../components/VocabularyForm.vue"

const renameVocabulary = (name: string) => {
  console.log(`Rename ${name}`)
}
</script>
