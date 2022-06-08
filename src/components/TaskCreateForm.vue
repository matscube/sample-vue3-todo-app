<template>
  <div class="flex flex-col items-center">
    <AppTitle>
      Create New Task
    </AppTitle>
    <form
      class="mt-10 mx-auto"
      :style="{
        'max-width': '800px'
      }"
      @submit.prevent
    >
      <div class="my-2 flex items-center">
        <label
          class="text-lg font-bold text-right cursor-pointer hover:opacity-50"
          for="title"
          :style="{
            'min-width': '200px'
          }"
        >
          Title
        </label>
        <input
          id="title"
          class="px-4 py-2 ml-4 border rounded max-w-full cursor-pointer"
          :style="{
            'width': '400px'
          }"
          type="text"
          v-model="item.title"
        />
      </div>
      <div class="my-2 flex items-center">
        <label
          class="text-lg font-bold text-right cursor-pointer hover:opacity-50"
          for="description"
          :style="{
            'min-width': '200px'
          }"
        >
          Description
        </label>
        <input
          id="description"
          class="px-4 py-2 ml-4 border rounded max-w-full cursor-pointer"
          :style="{
            'width': '400px'
          }"
          type="text"
          v-model="item.description"
        />
      </div>
      <div class="mt-4 mx-auto flex justify-center">
        <button
          class="px-4 py-2 border rounded bg-blue-400 text-white font-bold hover:opacity-50 cursor-pointer"
          type="button"
          @click="onSubmit"
        >
          Create
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Task } from '@/types';
import { defineComponent, ref } from 'vue'
import AppTitle from '@/components/AppTitle.vue'

export default defineComponent({
  components: {
    AppTitle,
  },
  setup(_props, { emit }) {
    const item = ref<Task>({
      title: '',
      description: '',
    })
    const clear = () => {
      item.value = {
        title: '',
        description: '',
      }
    }
    const onSubmit = () => {
      console.info('onSubmit on TodoForm.vue')
      emit('submit', {
        item: item.value
      })
      clear()
    }
    return {
      item,
      clear,
      onSubmit,
    }
  },
})
</script>

<style scoped>
</style>
