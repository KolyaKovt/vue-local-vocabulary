import { useToast } from "vue-toastification"
import ConfirmationToast from "../components/ConfirmationToast.vue"

export const confirm = (message: string, onConfirm: () => void) => {
  const toast = useToast()

  toast({
    component: ConfirmationToast,
    props: {
      message,
      onConfirm,
    },
  })
}
