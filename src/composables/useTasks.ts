import { TaskRepository } from "@/repositories/task"
import { Task } from "@/types"
import { ref } from "vue"

export const useTasks = () => {
  const isTaskLoading = ref<boolean>(false)

  const tasks = ref<Task[]>([])
  const loadTasks = async () => {
    isTaskLoading.value = true
    const result = await TaskRepository.get()
    tasks.value = result
    isTaskLoading.value = false
  }
  const refreshTasks = async () => {
    loadTasks()
  }
  const saveTask = async (item: Task): Promise<boolean> => {
    isTaskLoading.value = true
    const result = await TaskRepository.save(item)
    isTaskLoading.value = false
    return result
  }
  const clearTasks = async (): Promise<boolean> => {
    const result = await TaskRepository.clear()
    return result
  }

  return {
    isTaskLoading,
    tasks,
    loadTasks,
    refreshTasks,
    saveTask,
    clearTasks,
  }
}