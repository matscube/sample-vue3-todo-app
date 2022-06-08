import { computed, ref } from "vue"

export const useMessages = () => {
  const messages = ref<string[]>([])
  const errorMessages = ref<string[]>([])
  const allMessages = computed(() => {
    const result: string[] = []
    if (messages.value.length > 0) result.push(...messages.value)
    if (errorMessages.value.length > 0) result.push(...errorMessages.value)
    return result
  })
  const messagesExist = computed(() => {
    return allMessages.value.length > 0
  })
  const clearMessages = () => {
    messages.value = []
    errorMessages.value = []
  }
  const setMessage = (message: string) => {
    messages.value.push(message)
  }
  const setErrorMessage = (message: string) => {
    errorMessages.value.push(message)
  }
  return {
    messages: allMessages,
    messagesExist,
    setMessage,
    setErrorMessage,
    clearMessages,
  }
}