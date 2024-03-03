import { createRouter, createWebHistory } from "vue-router"
import VocabulariesList from "../views/VocabulariesList.vue"
import NewVocabulary from "../components/NewVocabulary.vue"
import OpenVocabulary from "../views/OpenVocabulary.vue"
import RenameVocabulary from "../views/RenameVocabulary.vue"
import ChangeWords from "../views/ChangeWords.vue"
import AddWords from "../views/AddWords.vue"
import GuessingWords from "../views/GuessingWords.vue"
import ConnectingWords from "../views/ConnectingWords.vue"

const routes = [
  {
    path: "/",
    children: [
      { path: "", component: VocabulariesList },
      { path: "new", component: NewVocabulary },
      { path: "rename/:id", component: RenameVocabulary },
      {
        path: ":id",
        children: [
          { path: "", component: OpenVocabulary },
          { path: "add", component: AddWords },
          {
            path: "play",
            children: [
              {
                path: "connecting-words",
                name: "connecting-words",
                component: ConnectingWords,
              },
              {
                path: "guessing-words",
                name: "guessing-words",
                component: GuessingWords,
              },
            ],
          },
          { path: "change/:wordId", component: ChangeWords },
        ],
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
