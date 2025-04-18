// core/devtools/eventBus.ts

export type EventPayload = {
  context?: string | null
  source?: string | null
  error?: Error | null
  message?: string | null
  level?: 'info' | 'warn' | 'error'
  [key: string]: any
}

export type EventHandler<T extends EventPayload = EventPayload> = (type: string, payload: T) => void

const listeners: Record<string, EventHandler[]> = {}

export const emit = <T extends EventPayload = EventPayload>(type: string, payload: T): void => {
  const specific = listeners[type] || []
  const wildcard = listeners['*'] || []

  for (const fn of specific) {
    fn(type, payload)
  }

  for (const fn of wildcard) {
    fn(type, payload)
  }
}

export const on = <T extends EventPayload = EventPayload>(type: string, handler: EventHandler<T>): void => {
  if (!listeners[type]) {
    listeners[type] = []
  }

  listeners[type].push(handler as EventHandler<EventPayload>)
}

export const clearListeners = (type?: string): void => {
  if (type) {
    delete listeners[type]
  } else {
    for (const key in listeners) {
      delete listeners[key]
    }
  }
}

export const emitError = (context: string, error: Error, extra?: Record<string, any>): void => {
  emit(`error:${context}`, {
    context,
    error,
    level: 'error',
    ...extra
  })
}

export const emitWarn = (context: string, message: string, extra?: Record<string, any>): void => {
  emit(`warn:${context}`, {
    context,
    message,
    level: 'warn',
    ...extra
  })
}

export const emitInfo = (context: string, message: string, extra?: Record<string, any>): void => {
  emit(`info:${context}`, {
    context,
    message,
    level: 'info',
    ...extra
  })
}

if (import.meta.env.DEV) {
  on('*', (type, payload) => {
    console.debug(
      `%c[${type}]`,
      'color: #888; font-weight: bold',
      payload
    )
  })
}