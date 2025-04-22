type SignalEvent = {
  id: string
  name: string
  type: string
  timestamp: number
  payload?: any
}

type SignalGroup = {
  source: string
  signals: Record<string, SignalEvent[]>
}

const devLogTree = new Map<string, SignalGroup>()

export function recordSignalLog(type: string, payload: any) {
  if (!payload?.id || !payload?.name) return

  const groupKey = payload.source ?? 'unknown'
  if (!devLogTree.has(groupKey)) {
    devLogTree.set(groupKey, { source: groupKey, signals: {} })
  }

  const group = devLogTree.get(groupKey)!
  if (!group.signals[payload.id]) {
    group.signals[payload.id] = []
  }

  group.signals[payload.id].push({
    id: payload.id,
    name: payload.name,
    type,
    timestamp: payload.timestamp,
    payload
  })
}

export function printDevLogTree() {
  for (const [source, group] of devLogTree.entries()) {
    console.groupCollapsed(`📦 Source: %c${source}`, 'color: goldenrod; font-weight: bold')

    for (const [id, events] of Object.entries(group.signals)) {
      const label = `${id} (${events[0]?.name})`

      console.groupCollapsed(`🧠 Signal: %c${label}`, 'color: steelblue; font-weight: bold')
      console.table(events.map(e => ({
        type: e.type,
        time: new Date(e.timestamp).toLocaleTimeString(),
        ...e.payload
      })))
      console.groupEnd()
    }

    console.groupEnd()
  }
}

if (import.meta.env.DEV) {
  ;(window as any).printDevLogTree = printDevLogTree
}