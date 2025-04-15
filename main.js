import { createSignal, effect } from "./signals.js";

const [count, setCount] = createSignal(0);

effect(() => {
  document.body.innerHTML = `<h1>Count: ${count()}</h1><p>Click man</p>`
})

document.addEventListener('click', () => {
  setCount(count() + 1)
})
