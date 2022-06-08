<template>
  <div class="flex flex-col items-center">
    <AppTitle>
      Task List
    </AppTitle>
    <div class="w-full flex items-center justify-end">
      <button
        class="px-4 py-2 border rounded bg-blue-400 text-white font-bold hover:opacity-50 cursor-pointer"
        type="button"
        @click="onReset"
      >
        Reset
      </button>
    </div>
    <div class="w-full mt-4 mx-auto">
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
import { Task } from '@/types';
import AppTitle from '@/components/AppTitle.vue'

export default defineComponent({
  components: {
    AppTitle,
  },
  props: {
    items: {
      type: Array as () => Task[],
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
