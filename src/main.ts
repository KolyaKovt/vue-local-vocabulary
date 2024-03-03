import { createApp } from "vue"
import "modern-normalize"
import "./styles.css"
import App from "./App.vue"
import router from "./router"
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

const app = createApp(App)

app.use(router)
app.use(Toast, {
  icon: false,
})

app.mount("#app")
