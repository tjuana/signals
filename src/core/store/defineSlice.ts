import { createSignalObject } from '../signal/createSignalObject'

export type StateType = Record<string, any>

export type Reducer<S extends StateType> = (state: S, ...args: any[]) => void
export type Reducers<S extends StateType> = Record<string, Reducer<S>>
export type Selectors<S extends StateType> = Record<string, (state: S) => any>

export const defineSlice = <S extends StateType>(config: {
  initial: S
  reducers: Reducers<S>
  selectors?: Selectors<S>
}) => {
  const { initial, reducers, selectors } = config

  const state = {} as { [K in keyof S]: ReturnType<typeof createSignalObject<S[K]>> }

  for (const key in initial) {
    state[key] = createSignalObject(initial[key])
  }

  const actions = {} as {
    [K in keyof typeof reducers]: (...args: Parameters<typeof reducers[K]>) => void
  }

  for (const key in reducers) {
    actions[key] = (...args: any[]) => {
      const proxy = new Proxy(
        {},
        {
          get(_, prop) {
            return state[prop as keyof S].value
          },
          set(_, prop, value) {
            state[prop as keyof S].set(value)
            return true
          }
        }
      )
      reducers[key](proxy as S, ...args)
    }
  }

  const computed = {} as {
    [K in keyof typeof selectors]: ReturnType<typeof createSignalObject<ReturnType<typeof selectors[K]>>> 
  } & { [key: string]: any }

  if (selectors) {
    const getSnapshot = (): S => {
      const snapshot = {} as S
      for (const key in state) {
        snapshot[key] = state[key].value
      }
      return snapshot
    }

    for (const [key, fn] of Object.entries(selectors)) {
      const compute = () => fn(getSnapshot())
      computed[key] = createSignalObject(compute())
    }
  }

  return {
    ...state,
    ...actions,
    ...computed
  }
}