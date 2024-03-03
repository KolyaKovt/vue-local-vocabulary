<template>
  <NotEnoughWordsError v-if="isNotEnoughWords" />

  <Container v-else>
    <Header :full="true">
      <p class="mainTitle mb-6">
        {{ leftWords !== 0 ? `Left words: ${leftWords}` : "Nice job!" }}
      </p>

      <div class="btnContainer">
        <RouterLink class="btn btn-secondary" :to="`/${vocabulary.id}`">
          Cancel
        </RouterLink>
        <button class="btn btn-success" type="button" @click="restart">
          Restart
        </button>
      </div>
    </Header>

    <main class="w-[100%]">
      <section>
        <h1 class="visually-hidden">plaing connecting words</h1>
        <ul class="wordsColumn mb-6">
          <li
            v-for="(index, i) in currIndFL"
            :key="i"
            :class="
              'word ' +
              (wrongAnswer && selectedFL === i
                ? 'wrong'
                : guessedIndFL.includes(i)
                ? 'guessed'
                : selectedFL === i
                ? 'selected'
                : '')
            "
            @click="
              () => {
                if (wrongAnswer) return
                selectedFL === i ? setSelectedFL(-1) : setSelectedFL(i)
                go()
              }
            "
          >
            {{ vocabulary.firstLang[index] }}
          </li>
        </ul>

        <ul class="wordsColumn">
          <li
            v-for="(index, i) in currIndSL"
            :key="i"
            :class="
              'word ' +
              (wrongAnswer && selectedSL === i
                ? 'wrong'
                : guessedIndSL.includes(i)
                ? 'guessed'
                : selectedSL === i
                ? 'selected'
                : '')
            "
            @click="
              () => {
                if (wrongAnswer) return
                selectedSL === i ? setSelectedSL(-1) : setSelectedSL(i)
                go()
              }
            "
          >
            {{ vocabulary.secLang[index] }}
          </li>
        </ul>
      </section>
    </main>
  </Container>
</template>

<script setup lang="ts">
import Header from "../components/Header.vue"
import NotEnoughWordsError from "../components/NotEnoughWordsError.vue"
import Container from "../components/Container.vue"
import { RouterLink, useRoute } from "vue-router"
import { useStore } from "../store"
import { getVocabulary } from "../helpers/getVocabulary"
import { ref } from "vue"

const countOfStrins = 4
let indecies: number[] = []
let countOfGuessedWords: number = 0

const route = useRoute()
const store = useStore()

const id = route.params.id as string

const vocabulary = getVocabulary(id)

const currIndFL = ref<number[]>([])
const currIndSL = ref<number[]>([])

const selectedFL = ref<number>(-1)
const selectedSL = ref<number>(-1)

const guessedIndFL = ref<number[]>([])
const guessedIndSL = ref<number[]>([])

const wrongAnswer = ref(false)

const clearSelected = () => {
  selectedFL.value = -1
  selectedSL.value = -1
}

const clearButtons = () => {
  guessedIndFL.value = []
  guessedIndSL.value = []
  clearSelected()
}

const getIndecies = () => {
  indecies = vocabulary.firstLang.map((_, i) => i)
}

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const shuffleArray = (array: number[]) => {
  for (let i = 0; i < array.length; i++) {
    const element = array[i]
    const randomIndex = getRandomNumber(0, array.length - 1)
    const anotherElement = array[randomIndex]
    array[i] = anotherElement
    array[randomIndex] = element
  }
}

const fillCurrentWords = () => {
  const fl = []
  const sl = []

  const minimal = Math.min(countOfStrins, indecies.length)

  for (let i = 0; i < minimal; i++) {
    const rndIndex = getRandomNumber(0, indecies.length - 1)

    fl.push(indecies[rndIndex])
    sl.push(indecies[rndIndex])

    indecies.splice(rndIndex, 1)
  }

  shuffleArray(sl)

  currIndFL.value = fl
  currIndSL.value = sl
}

const go = () => {
  if (selectedFL.value === -1 || selectedSL.value === -1) return

  if (currIndFL.value[selectedFL.value] === currIndSL.value[selectedSL.value]) {
    guessedIndFL.value.push(selectedFL.value)
    guessedIndSL.value.push(selectedSL.value)
    countOfGuessedWords++
    leftWords.value = vocabulary.firstLang.length - countOfGuessedWords
    clearSelected()
  } else {
    wrongAnswer.value = true
    setTimeout(() => {
      wrongAnswer.value = false
      clearSelected()
    }, 500)
  }

  if (leftWords.value === 0) store.commit("exercise", vocabulary.id)

  if (guessedIndFL.value.length === countOfStrins) {
    clearButtons()
    fillCurrentWords()
  }
}

const restart = () => {
  countOfGuessedWords = 0
  leftWords.value = vocabulary.firstLang.length - countOfGuessedWords
  clearButtons()
  getIndecies()
  fillCurrentWords()
}

const setSelectedFL = (value: number) => (selectedFL.value = value)
const setSelectedSL = (value: number) => (selectedSL.value = value)

const isNotEnoughWords = vocabulary.firstLang.length < 4

const leftWords = ref(0)

restart()
</script>
