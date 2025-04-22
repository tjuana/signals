import { createSignalObject } from '../signal/createSignalObject'
import { createModule } from '../module/createModule'
import { computed } from '../signal/computed'

export const defineSlice = <S extends Record<string, any>>(config: {
  state: S
  actions: Record<string, (state: S, ...args: any[]) => void>
  selectors?: Record<string, (state: S) => any>
}) => {
  const output = Object.fromEntries(
    Object.entries(config.state).map(([key, value]) => [key, createSignalObject(value)])
  ) as { [K in keyof S]: ReturnType<typeof createSignalObject<S[K]>> }

  const input = Object.fromEntries(
    Object.keys(config.actions).map(key => [key, createSignalObject<any[]>([])])
  )

  const getSnapshot = (): S => {
    const snapshot = {} as S
    for (const key in output) {
      snapshot[key] = output[key].value
    }
    return snapshot
  }

  const selectors = Object.fromEntries(
    Object.entries(config.selectors ?? {}).map(([key, selectorFn]) => [
      key,
      computed(() => selectorFn(getSnapshot()))
    ])
  ) as Record<string, ReturnType<typeof computed>>

  const setup = () => {
    for (const key in config.actions) {
      input[key].subscribe(() => {
        const args = input[key].value
        const proxy = new Proxy({}, {
          get(_, prop) {
            return output[prop as keyof S].value
          },
          set(_, prop, value) {
            output[prop as keyof S].set(value)
            return true
          }
        })
      
        config.actions[key](proxy as S, ...args)
      })
    }
  }

  return createModule({
    input,
    output: {
      ...output,
      ...selectors
    },
    setup
  })
}