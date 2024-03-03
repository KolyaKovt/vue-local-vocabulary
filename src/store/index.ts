import { Store, createStore } from "vuex"
import { Vocabulary } from "../types"
import { nanoid } from "nanoid"
import { getVocabulary } from "../helpers/getVocabulary"

interface State {
  vocabularies: Vocabulary[]
}

const store = createStore<State>({
  state: {
    vocabularies: [],
  },
  mutations: {
    deleteVocabulary(state, id: string) {
      state.vocabularies = state.vocabularies.filter(voc => voc.id !== id)
    },
    addVocabulary: (state, name: string) => {
      state.vocabularies.push({
        id: nanoid(),
        name,
        firstLang: [],
        secLang: [],
        wordsIds: [],
        exercise: 0,
      })
    },
    renameVocabulary: (_, payload: { name: string; id: string }) => {
      const { id, name } = payload

      const voc = getVocabulary(id)
      voc.name = name
    },
    // addWord: (
    //   state,
    //   {
    //     payload,
    //   }: {
    //     payload: { vocabularyId: string; word: string; translation: string }
    //   }
    // ) => {
    //   const { word, translation, vocabularyId } = payload

    //   const voc = getVocabularyFromState(state, vocabularyId)
    //   voc.firstLang.push(word)
    //   voc.secLang.push(translation)
    //   voc.wordsIds.push(nanoid())
    // },
    // deleteWord: (
    //   state,
    //   { payload }: { payload: { vocabularyId: string; wordId: string } }
    // ) => {
    //   const { vocabularyId, wordId } = payload

    //   const voc = getVocabularyFromState(state, vocabularyId)
    //   const ind = voc.wordsIds.indexOf(wordId)

    //   voc.firstLang.splice(ind, 1)
    //   voc.secLang.splice(ind, 1)
    //   voc.wordsIds.splice(ind, 1)
    // },
    // changeWord: (
    //   state,
    //   {
    //     payload,
    //   }: {
    //     payload: {
    //       vocabularyId: string
    //       wordId: string
    //       word: string
    //       translation: string
    //     }
    //   }
    // ) => {
    //   const { vocabularyId, wordId, word, translation } = payload

    //   const voc = getVocabularyFromState(state, vocabularyId)
    //   const ind = voc.wordsIds.indexOf(wordId)

    //   voc.firstLang[ind] = word
    //   voc.secLang[ind] = translation
    // },
    // exercise: (state, { payload }: { payload: string }) => {
    //   const voc = getVocabularyFromState(state, payload)
    //   voc.exercise++
    // },
  },
  actions: {},
  getters: {},
  modules: {},
})

export default store

export function useStore(): Store<State> {
  return store as Store<State>
}
