// index.ts

export type Listener<T> = (value: T) => void

export interface Emitter<T = any> {
  on(event: string, listener: Listener<T>): void
  off(event: string, listener: Listener<T>): void
  emit(event: string, value: T): void
}

export function createEmitter<T = unknown>(): Emitter<T> {
  const listeners: Map<string, Listener<T>[]> = new Map()

  return {
    on(event, listener) {
      const existingListeners = listeners.get(event) || []
      listeners.set(event, [...existingListeners, listener])
    },

    off(event, listener) {
      const existingListeners = listeners.get(event)
      if (existingListeners) {
        const updatedListeners = existingListeners.filter((l) => l !== listener)
        if (updatedListeners.length === 0) {
          listeners.delete(event)
        } else {
          listeners.set(event, updatedListeners)
        }
      }
    },

    emit(event, value) {
      const existingListeners = listeners.get(event)
      if (existingListeners) {
        existingListeners.forEach((listener) => listener(value))
      }
    },
  }
}