import { createApp } from "vue"
import "modern-normalize"
import "./styles.css"
import App from "./App.vue"
import router from "./router"
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import store from "./store"

const app = createApp(App)

app
  .use(router)
  .use(Toast, {
    icon: false,
  })
  .use(store)

app.mount("#app")
