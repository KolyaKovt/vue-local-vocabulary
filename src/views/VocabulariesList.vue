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
          <li v-for="vocabulary in vocabularies()" :key="vocabulary.id">
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
                <RouterLink
                  class="btn btn-primary"
                  :to="`/rename/${vocabulary.id}`"
                >
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

<script setup lang="ts">
import { RouterLink } from "vue-router"
import Header from "../components/Header.vue"
import Container from "../components/Container.vue"
import { useToast } from "vue-toastification"
import ConfirmationToast from "../components/ConfirmationToast.vue"
import { useStore } from "../store"

const toast = useToast()
const store = useStore()

const vocabularies = () => store.state.vocabularies

const confirmDelete = (id: string, name: string) => {
  toast({
    component: ConfirmationToast,
    props: {
      message: `Are you sure you want to delete "${name}"?`,
      onConfirm: () => {
        store.commit("deleteVocabulary", id)
      },
    },
  })
}
</script>
