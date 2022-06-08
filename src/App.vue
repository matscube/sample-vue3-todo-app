<template>
  <div id="app" class="mx-auto max-w-screen-md px-4 py-2">
    <TaskCreateForm
      class="mt-10"
      @submit="onCreateTask"
    />
    <Tasks
      class="mt-10"
      :items="tasks"
      @reset="onResetTasks"
    />

    <AppLoader
      :is-show="isTaskLoading"
    />
    <ToastMessages
      :messages="messages"
      @clear="onClearMessages"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import TaskCreateForm from './components/TaskCreateForm.vue';
import Tasks from './components/Tasks.vue';
import AppLoader from './components/AppLoader.vue';
import ToastMessages from './components/ToastMessages.vue';
import { Task } from './types';
import { useTasks } from './composables/useTasks';
import { useMessages } from './composables/useMessages';

export default defineComponent({
  components: {
    TaskCreateForm,
    Tasks,
    AppLoader,
    ToastMessages,
  },
  setup() {
    const {
      isTaskLoading,
      tasks,
      loadTasks,
      refreshTasks,
      saveTask,
      clearTasks,
    } = useTasks()

    const {
      messages,
      setMessage,
      setErrorMessage,
      clearMessages,
    } = useMessages()

    /**
     * Actions
     */
    const onResetTasks = async() => {
      const result = await clearTasks()
      if (result) {
        setMessage('Created Successfully')
        refreshTasks()
      } else {
        setErrorMessage('Error')
      }
    }
    const onCreateTask = async (payload: {
      item: Task
    }) => {
      clearMessages()
      const result = await saveTask(payload.item)
      if (result) {
        setMessage('Created Successfully')
        refreshTasks()
      } else {
        setErrorMessage('Error')
      }
    }
    const onClearMessages = () => {
      clearMessages()
    }

    onMounted(loadTasks)
    return {
      tasks,
      messages,
      isTaskLoading,
      onClearMessages,
      onResetTasks,
      onCreateTask,
    }
  }
});
</script>
