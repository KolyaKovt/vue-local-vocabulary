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
        <button class="btn btn-success" @click="restart">Restart</button>
      </div>
    </Header>

    <main class="w-[100%]">
      <section>
        <h1 class="visually-hidden">playing guessing words</h1>
        <p class="mb-4 text-2xl text-center">
          {{ vocabulary.firstLang[correctInd] }}
        </p>
        <ul class="wordsColumn">
          <li
            v-for="(bIndex, i) in buttonsInds"
            :class="'word ' + (wrongInds.includes(i) ? 'wrong' : '')"
            @click="() => checkTheAnswer(i)"
            :key="i"
          >
            {{ vocabulary.secLang[bIndex] }}
          </li>
        </ul>
      </section>
    </main>
  </Container>
</template>

<script setup lang="ts">
import Header from "../components/Header.vue"
import { RouterLink, useRoute } from "vue-router"
import Container from "../components/Container.vue"
import NotEnoughWordsError from "../components/NotEnoughWordsError.vue"
import { getVocabulary } from "../helpers/getVocabulary"
import { ref } from "vue"
import { useStore } from "../store"

const route = useRoute()
const store = useStore()

const id = route.params.id as string

const vocabulary = getVocabulary(id)

const countOfStrins = 6
let indecies: number[] = []
let countOfGuessedWords = 0
let correctInd = -1

const buttonsInds = ref<number[]>([])
const wrongInds = ref<number[]>([])

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

const fillButtonsInds = () => {
  const rndIndex = getRandomNumber(0, indecies.length - 1)
  correctInd = indecies[rndIndex]
  const l = [indecies[rndIndex]]

  indecies.splice(rndIndex, 1)

  const minimal = Math.min(countOfStrins, vocabulary.firstLang.length)

  for (let i = 1; i < minimal; i++) {
    const rndIndexForButtns = getRandomNumber(
      0,
      vocabulary.firstLang.length - 1
    )

    if (l.includes(rndIndexForButtns) || correctInd === rndIndexForButtns) {
      i--
      continue
    }

    l.push(rndIndexForButtns)
  }

  shuffleArray(l)

  buttonsInds.value = l
}

const checkTheAnswer = (i: number) => {
  if (buttonsInds.value[i] === correctInd) {
    countOfGuessedWords++
    leftWords.value = vocabulary.firstLang.length - countOfGuessedWords
    wrongInds.value = []
    fillButtonsInds()
  } else {
    if (!wrongInds.value.includes(i)) {
      wrongInds.value.push(i)
    }
  }

  if (leftWords.value === 0) {
    buttonsInds.value = []
    correctInd = -1
    store.commit("exercise", vocabulary.id)
  }
}

const restart = () => {
  countOfGuessedWords = 0
  wrongInds.value = []
  leftWords.value = vocabulary.firstLang.length - countOfGuessedWords
  indecies = vocabulary.firstLang.map((_, i) => i)
  fillButtonsInds()
}

const leftWords = ref(0)

restart()

const isNotEnoughWords = vocabulary.firstLang.length < 4
</script>
