import { useStore } from "../store"

export const getVocabulary = (vocabularyId: string) => {
  const store = useStore()
  const vocabularies = store.state.vocabularies
  const vocabulary = vocabularies.filter(voc => voc.id === vocabularyId)[0]

  return vocabulary
}
