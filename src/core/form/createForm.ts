import { createSignalObject } from '../signal/createSignalObject'
import { computed } from '../signal/computed'
import { effect } from '../signal/createSignal'
import { withSource } from '../dev/logger/context'

export type FieldConfig<T = string> = {
  initial: T
  validate?: (value: T) => string | null
}

export type Field<T> = {
  value: ReturnType<typeof createSignalObject<T>>
  error: ReturnType<typeof createSignalObject<string | null>>
  touched: ReturnType<typeof createSignalObject<boolean>>
  ref: React.RefObject<HTMLInputElement>
  set: (val: T) => void
}

export const createForm = <TFields extends Record<string, FieldConfig<any>>>(config: {
  fields: TFields
}) => {
  return withSource('createForm', () => {
  const fields = {} as {
    [K in keyof TFields]: Field<TFields[K]['initial']>
  }

  for (const key in config.fields) {
    const fieldConfig = config.fields[key]
    const value = createSignalObject(fieldConfig.initial)
    const error = createSignalObject<string | null>(null)
    const touched = createSignalObject(false)
    const ref = { current: null } as unknown as React.RefObject<HTMLInputElement>

    const set = (val: any) => {
      value.set(val)
      touched.set(true)
      if (fieldConfig.validate) {
        error.set(fieldConfig.validate(val))
      }
    }

    fields[key] = {
      value,
      error,
      touched,
      ref,
      set
    } as any
  }

  const rawIsValid = computed(() => {
    return Object.values(fields).every(field => field.error.value === null)
  })
  
  const isValid = createSignalObject(rawIsValid())
  
  effect(() => {
    isValid.set(rawIsValid())
  })

  return {
      ...fields,
      isValid
    }
  })
}