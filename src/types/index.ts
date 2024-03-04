export interface Vocabulary {
  id: string
  name: string
  firstLang: string[]
  secLang: string[]
  wordsIds: string[]
  exercise: number
}

export interface WordsColumn {
  currInd: number[]
  selected: number
  guessedInd: number[]
  setSelected: (value: number) => number
  lang: string[]
}
