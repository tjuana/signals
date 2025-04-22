let currentSource: { name: string; instance?: string } | null = null

export const withSource = <T>(source: string, fn: () => T, instance?: string): T => {
  const prev = currentSource
  currentSource = { name: source, instance }
  const result = fn()
  currentSource = prev
  return result
}

export const getCurrentSource = (): { name: string; instance?: string } | null => {
  return currentSource
}