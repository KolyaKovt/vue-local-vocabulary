<script setup lang="ts">
import { RouterLink } from "vue-router"
import Header from "../components/Header.vue"
import Container from "../components/Container.vue"
import { Vocabulary } from "../types"
import { useToast } from "vue-toastification"
import ConfirmationToast from "../components/ConfirmationToast.vue"

const toast = useToast()

const vocabularies: Vocabulary[] = [
  {
    name: "kolya",
    id: "asdas331sd31x2x23",
    firstLang: [
      "bedekken",
      "zinvol",
      "daar gaat het niet om, het gaat er niet om",
      "opzoeken",
    ],
    secLang: [
      "прикрыть, покрывать",
      "логичный, значимый",
      "не в этом дело",
      "найти, навестить",
    ],
    wordsIds: ["1", "2", "3", "4"],
    exercise: 0,
  },
]

const confirmDelete = (id: string, name: string) => {
  toast({
    component: ConfirmationToast,
    props: {
      message: `Are you sure you want to delete "${name}"?`,
      onConfirm: () => {
        // dispatch(deleteVocabulary(id))
        console.log(`delete ${name}. id: ${id}`)
      },
    },
  })
}
</script>

<template>
  <Container>
    <Header :full="false">
      <p class="mainTitle mb-6">Vocabularies</p>
      <RouterLink class="btn btn-success" to="/new">
        New vocabulary
      </RouterLink>
    </Header>

    <main>
      <section>
        <h2 class="visually-hidden">Vocabularies list</h2>
        <ul class="itemsList">
          <li v-for="vocabulary in vocabularies" :key="vocabulary.id">
            <div class="btnContainer mb-4 font-bold text-2xl overflow-x-auto">
              <p>{{ vocabulary.name }}</p>
              <p>({{ vocabulary.exercise }})</p>
            </div>
            <ul class="btnContainer">
              <li>
                <RouterLink class="btn btn-secondary" :to="`/${vocabulary.id}`">
                  Open
                </RouterLink>
              </li>
              <li>
                <RouterLink class="btn btn-primary" :to="`/rename/${vocabulary.id}`">
                  Rename
                </RouterLink>
              </li>
              <li>
                <button
                  class="btn btn-danger"
                  type="button"
                  @click="() => confirmDelete(vocabulary.id, vocabulary.name)"
                >
                  Delete
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </main>
  </Container>
</template>
