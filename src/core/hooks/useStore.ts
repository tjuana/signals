import { useSignalValue } from '../hooks/useSignalValue'

export const useStore = <
  TInput extends Record<string, { set: (...args: any[]) => void }>,
  TOutput extends Record<string, any>
>(slice: {
  input: TInput
  output: TOutput
}) => {
  return () => {
    const outputMapped = Object.entries(slice.output).reduce((acc, [key, signal]) => {
      if ('value' in signal) {
        acc[key as keyof TOutput] = useSignalValue(signal)
      }
      return acc
    }, {} as { [K in keyof TOutput]: TOutput[K]['value'] })

    const inputMapped = Object.entries(slice.input).reduce((acc, [key, signal]) => {
      acc[key as keyof TInput] = (...args: any[]) => signal.set(args)
      return acc
    }, {} as { [K in keyof TInput]: (...args: any[]) => void })

    return {
      ...outputMapped,
      ...inputMapped
    }
  }
}