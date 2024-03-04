import { createRouter, createWebHistory } from "vue-router"
import { useStore } from "../store"

const VocabulariesList = () => import("../views/VocabulariesList.vue")
const NewVocabulary = () => import("../views/NewVocabulary.vue")
const OpenVocabulary = () => import("../views/OpenVocabulary.vue")
const RenameVocabulary = () => import("../views/RenameVocabulary.vue")
const ChangeWords = () => import("../views/ChangeWords.vue")
const AddWords = () => import("../views/AddWords.vue")
const GuessingWords = () => import("../views/GuessingWords.vue")
const ConnectingWords = () => import("../views/ConnectingWords.vue")

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

const store = useStore()

router.beforeEach((_, __, next) => {
  store.commit("setIsLoading", true)
  next()
})

router.afterEach(() => {
  store.commit("setIsLoading", false)
})

export default router
