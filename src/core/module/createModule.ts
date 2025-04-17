export function createModule<
  I extends Record<string, any>,
  O extends Record<string, any>
>({ input, output, setup }: {
  input: I
  output: O
  setup: (ctx: { input: I; output: O }) => void
}) {
  setup({ input, output })
  return { input, output }
}
