<template>
  <div id="app" class="mx-auto max-w-screen-md">
    <TodoForm
      @submit="onSubmit"
    />
    <!-- Message Area -->
    <div class="px-4 py-2">
      <p
        v-if="messageExist"
        class="text-green-500 font-bold"
      >
        {{ message }}
      </p>
      <p
        v-if="messageErrorExist"
        class="text-red-500 font-bold"
      >
        {{ messageError }}
      </p>
    </div>
    <TodoList
      class="mt-10"
      :items="items"
      @reset="reset"
    />

    <AppLoader
      :is-show="isLoading"
    />
    <ToastItems
      :messages="messages"
      @clear="onClearMessages"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import TodoForm from './components/TodoForm.vue';
import TodoList from './components/TodoList.vue';
import AppLoader from './components/AppLoader.vue';
import ToastItems from './components/ToastItems.vue';
import { TodoItem } from './types';
import { TaskRepository } from './repositories/task';

export default defineComponent({
  components: {
    TodoForm,
    TodoList,
    AppLoader,
    ToastItems,
  },
  setup() {
    /**
     * 画面状態管理
     */
    const isLoading = ref<boolean>(false)


    /**
     * Message管理
     */
    const message = ref<string>('')
    const messageError = ref<string>('')
    const messages = computed(() => {
      const messages: string[] = []
      if (message.value) messages.push(message.value)
      if (messageError.value) messages.push(messageError.value)
      return messages
    })
    const messageExist = computed(() => {
      return message.value !== ''
    })

    /**
     * Items
     */
    const items = ref<TodoItem[]>([])
    const loadItems = async () => {
      isLoading.value = true
      const result = await TaskRepository.get()
      items.value = result
      isLoading.value = false
    }
    onMounted(loadItems)
    const reset = async() => {
      const result = await TaskRepository.clear()
      if (result) {
        message.value = 'Created Successfully'
        refresh()
      } else {
        message.value = 'Error'
      }
    }
    const refresh = async () => {
      loadItems()
    }
    const onSubmit = async (payload: {
      item: TodoItem
    }) => {
      console.info('onSubmit on App.vue')
      console.info(payload.item)
      // return
      clearMessage()
      isLoading.value = true
      const result = await TaskRepository.save(payload.item)
      isLoading.value = false
      if (result) {
        message.value = 'Created Successfully'
        refresh()
      } else {
        message.value = 'Error'
      }
    }

    /**
     * Toast Messages
     */
    const clearMessage = () => {
      message.value = ''
      messageError.value = ''
    }
    const onClearMessages = () => {
      clearMessage()
    }


    return {
      items,
      messages,
      onClearMessages,
      reset,
      refresh,
      onSubmit,
      isLoading,
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
