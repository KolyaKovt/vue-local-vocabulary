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
          <li class="flex justify-between items-center p-2 border rounded-lg" v-for="{ name, exercise, id } in vocabularies" :key="id">
            <div
              class="btnContainer font-bold text-2xl overflow-x-auto"
              @click="() => router.push(`/${id}`)"
            >
              <p>{{ name }}</p>
              <p>({{ exercise }})</p>
            </div>
            <Menu>
              <li>
                <RouterLink :to="`/rename/${id}`">Rename</RouterLink>
              </li>
              <li>
                <button type="button" @click="() => confirmDelete(id, name)">
                  Delete
                </button>
              </li>
            </Menu>
          </li>
        </ul>
      </section>
    </main>
  </Container>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router"
import { computed } from "vue"
import Header from "../components/Header.vue"
import Container from "../components/Container.vue"
import { useStore } from "../store"
import { confirm } from "../helpers/confirm"
import Menu from "../components/Menu.vue"

const store = useStore()
const router = useRouter()

const vocabularies = computed(() => store.state.vocabularies)

const confirmDelete = (id: string, name: string) =>
  confirm(`Are you sure you want to delete "${name}"?`, () => {
    store.commit("deleteVocabulary", id)
  })
</script>
