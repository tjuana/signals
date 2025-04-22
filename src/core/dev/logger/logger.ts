import { getCurrentSource } from './context'

export type LogLevel = 'init' | 'get' | 'set' | 'sub' | 'effect' | 'unsub'

const IS_ENABLED: boolean =
  import.meta.env.VITE_DEBUG_SIGNAL === 'true' ||
  import.meta.env.MODE === 'development'

export function logSignal(label: string, type: LogLevel, payload?: unknown): void {
  if (!IS_ENABLED) return

  const emoji =
    type === 'get' ? '👁️ GET'
    : type === 'set' ? '✏️ SET'
    : type === 'init' ? '🧠 INIT'
    : type === 'sub' ? '📡 SUB'
    : type === 'unsub' ? '🚫 UNSUB'
    : type === 'effect' ? '✨ EFFECT'
    : '❓'

  const color =
    type === 'get' ? 'dodgerblue'
    : type === 'set' ? 'green'
    : type === 'init' ? '#999'
    : type === 'sub' ? 'goldenrod'
    : type === 'unsub' ? 'crimson'
    : '#333'

  const source = getCurrentSource()

  const groupLabel = source
    ? `[${source.name}${source.instance ? ':' + source.instance : ''}]`
    : '[signal]'

  // Outer group: by source
  console.groupCollapsed(`%c${groupLabel}`, 'color: #aaa; font-weight: bold')

  // Inner group: by signal label and action
  console.groupCollapsed(
    `%c[${label}] %c${emoji}`,
    'color:#888;font-weight:bold',
    `color:${color};font-weight:bold`
  )

  if (payload !== undefined) {
    console.log('%cPayload:', 'color:#999', payload)
  }

  console.groupEnd()
  console.groupEnd()
}