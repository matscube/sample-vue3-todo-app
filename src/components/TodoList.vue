<template>
  <div>
    <div class="flex items-center justify-center relative">
      <h1 class="text-xl font-bold">Todo List</h1>
      <button
        class="absolute right-0 px-4 py-2 border rounded bg-blue-400 text-white font-bold hover:opacity-50 cursor-pointer"
        type="button"
        @click="onReset"
      >
        Reset
      </button>
    </div>
    <div class="mt-10 mx-auto max-w-full">
      <ul>
        <li
          v-for="(item, index) in items"
          :key="index"
          class="px-4 py-2 my-2 flex items-center border rounded hover:opacity-50 cursor-pointer"
        >
          <span class="text-xl font-bold">
            {{ item.title || 'empty title' }}
          </span>
          <p class="ml-2">
            {{ item.description || 'empty description' }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TodoItem } from '@/types';

export default defineComponent({
  props: {
    items: {
      type: Array as () => TodoItem[],
      required: true,
    },
  },
  setup(_props, { emit }) {
    return {
      onReset: () => {
        emit('reset')
      }
    }
  },
})
</script>

<style scoped>
</style>
