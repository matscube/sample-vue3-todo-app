import { createSampleItems } from "@/factories/item"
import { TodoItem } from "@/types"

const checkLocalStorage = (): boolean => {
  console.info(`checking localStorage exist...`)
  console.info(`localStorage: ${localStorage}`)
  return localStorage !== undefined
}

const storageKey = 'sample-vue2-todo-app_items'

const getItemsFromLocalStorage = (): TodoItem[] => {
  if (!checkLocalStorage()) throw Error(`localStorageが存在しません`)
  const items = localStorage.getItem(storageKey)
  if (items === null) return []
  return JSON.parse(items) as TodoItem[]
}
const setItemsToLocalStorage = (items: TodoItem[]) => {
  if (!checkLocalStorage()) throw Error(`localStorageが存在しません`)
  localStorage.setItem(storageKey, JSON.stringify(items))
}
const addItemToLocalStorage = (item: TodoItem) => {
  if (!checkLocalStorage()) throw Error(`localStorageが存在しません`)
  const items = getItemsFromLocalStorage()
  items.push(item)
  setItemsToLocalStorage(items)
}

export const TaskRepository = {
  async get(): Promise<TodoItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = getItemsFromLocalStorage()
        resolve(tasks)
      }, 300)
    })
  },
  async save(task: TodoItem): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        addItemToLocalStorage(task)
        resolve(true)
      }, 300)
    })
  },
  async clear(): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        setItemsToLocalStorage([])
        resolve(true)
      }, 300)
    })
  },
}