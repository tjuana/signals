let currentEffect = null

export function createSignal (initial) {
  let value = initial
  const subscribers = new Set()

  function get () {
    if (currentEffect) {
      subscribers.add(currentEffect)
    }
    return value
  }

  function set (newValue) {
    value = typeof newValue === 'function' ? get() : newValue
    for (const sub of subscribers) {
      sub()
    }
  }

  return [get, set]
}

export function effect (fn) {
  currentEffect = fn
  fn()
  currentEffect = null
}