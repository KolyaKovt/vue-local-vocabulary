import { Store, createStore } from "vuex"
import createPersistedState from "vuex-persistedstate"
import { Vocabulary } from "../types"
import { nanoid } from "nanoid"
import { getVocabulary } from "../helpers/getVocabulary"

interface State {
  vocabularies: Vocabulary[]
  isLoading: boolean
}

const store = createStore<State>({
  state: {
    vocabularies: [],
    isLoading: false,
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
    addWord: (
      _,
      payload: { vocabularyId: string; word: string; translation: string }
    ) => {
      const { word, translation, vocabularyId } = payload

      const voc = getVocabulary(vocabularyId)
      voc.firstLang.push(word)
      voc.secLang.push(translation)
      voc.wordsIds.push(nanoid())
    },
    deleteWord: (_, payload: { vocabularyId: string; wordId: string }) => {
      const { vocabularyId, wordId } = payload

      const voc = getVocabulary(vocabularyId)
      const ind = voc.wordsIds.indexOf(wordId)

      voc.firstLang.splice(ind, 1)
      voc.secLang.splice(ind, 1)
      voc.wordsIds.splice(ind, 1)
    },
    changeWord: (
      _,
      payload: {
        vocabularyId: string
        wordId: string
        word: string
        translation: string
      }
    ) => {
      const { vocabularyId, wordId, word, translation } = payload

      const voc = getVocabulary(vocabularyId)
      const ind = voc.wordsIds.indexOf(wordId)

      voc.firstLang[ind] = word
      voc.secLang[ind] = translation
    },
    exercise: (_, id: string) => {
      const voc = getVocabulary(id)
      voc.exercise++
    },
    setIsLoading: (state, value: boolean) => {
      state.isLoading = value
    },
  },
  actions: {},
  getters: {},
  modules: {},
  plugins: [createPersistedState()],
})

export default store

export const useStore = (): Store<State> => store
