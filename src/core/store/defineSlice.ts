import { createSignalObject } from '../signal/createSignalObject'

type Reducer<S> = (state: S, ...args: any[]) => void
type Reducers<S> = Record<string, Reducer<S>>
type Selectors<S> = Record<string, (state: S) => any>

export function defineSlice<
  S extends object,
  R extends Reducers<S>,
  L extends Selectors<S> = {}
>({
  // name,
  initial,
  reducers,
  selectors,
  // persist
}: {
  // name: string
  initial: S
  reducers: R
  selectors?: L
  // persist?: boolean
}) {
  // 1. Create state as reactive signal objects
  const state = {} as { [K in keyof S]: ReturnType<typeof createSignalObject<S[K]>> }

  for (const key in initial) {
    state[key] = createSignalObject(initial[key])
  }

  // 2. Wrap reducers to mutate signal objects
  const actions = {} as {
    [K in keyof R]: (...args: Parameters<R[K]>) => void
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

  // 3. Generate selectors
  const computed = {} as {
    [K in keyof L]: ReturnType<typeof createSignalObject<ReturnType<L[K]>>>
  }

  if (selectors) {
    for (const key in selectors) {
      const compute = () => selectors[key](getSnapshot())
      computed[key] = createSignalObject(compute())
    }
  }

  function getSnapshot(): S {
    const snapshot = {} as S
    for (const key in state) {
      snapshot[key] = state[key].value
    }
    return snapshot
  }

  // 4. Return everything flat
  return {
    ...state,
    ...actions,
    ...computed
  }
}