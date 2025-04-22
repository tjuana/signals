import { defineSlice } from '@/core/store/defineSlice'

export const form = defineSlice({
  state: {
    name: '',
    email: ''
  },
  actions: {
    setName: (state, val: string) => {
      state.name = val
    },
    setEmail: (state, val: string) => {
      state.email = val
    }
  },
  selectors: {
    isValid: (state) => state.name.length > 0 && state.email.includes('@')
  }
})