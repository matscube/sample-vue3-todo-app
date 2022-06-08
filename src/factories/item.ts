import { TodoItem } from "@/types"

export const createSampleItem = (payload: {
  id: number
}): TodoItem => {
  return {
    title: `title ${payload.id}`,
    description: `description ${payload.id}`,
  }
}

export const createSampleItems = (payload: {
  count: number,
}): TodoItem[] => {
  return [...Array(payload.count)].map((_, i) => {
    return {
      title: `title ${i}`,
      description: `description ${i}`,
    }
  })
}
