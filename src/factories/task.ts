import { Task } from "@/types"

export const createSampleTask = (payload: {
  id: number
}): Task => {
  return {
    title: `title ${payload.id}`,
    description: `description ${payload.id}`,
  }
}

export const createSampleTasks = (payload: {
  count: number,
}): Task[] => {
  return [...Array(payload.count)].map((_, i) => {
    return {
      title: `title ${i}`,
      description: `description ${i}`,
    }
  })
}
