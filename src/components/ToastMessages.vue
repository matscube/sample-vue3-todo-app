<template>
  <div
    v-if="isShow"
    class="absolute top-0 right-0 p-2 flex flex-col items-end gap-2"
  >
    <div
      v-for="(message, key) in messages"
      :key="key"
      class="relative py-2 pl-2 pr-4 border rounded bg-black opacity-60 flex items-stretch"
      :style="{
        'width': '300px',
        'min-height': '64px',
      }"
    >
      <div class="border border-l-2 border-white"></div>
      <p class="ml-2 text-left text-white font-bold">
        {{ message }}
      </p>
      <button
        class="absolute right-0 mr-2"
        @click="close"
      >
        <span class="close-icon"></span>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, toRefs } from 'vue'

export default defineComponent({
  props: {
    messages: {
      type: Array as () => string[],
      required: true,
    }
  },
  setup(props, { emit }) {
    const { messages } = toRefs(props)
    const isShow = computed(() => messages.value.length)
    const close = () => {
      emit('clear')
    }
    onMounted(() => {
      window.addEventListener('keyup', (event) => {
        if (event.key === 'Escape') {
          emit('clear')
        }
      })
    })
    return {
      isShow,
      close,
    }
  },
})
</script>

<style scoped>
.close-icon {
  display: block;
  position: relative;
  width: 16px;
  height: 16px;
}
.close-icon::before, .close-icon::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 3px; /* width of icon bar */
  height: 16px; /* size of icon */
  background: white;
}
.close-icon::before {
  transform: translate(-50%,-50%) rotate(45deg);
}
.close-icon::after {
  transform: translate(-50%,-50%) rotate(-45deg);
}
</style>