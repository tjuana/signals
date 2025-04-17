import { defineSlice } from '@/core/store/defineSlice'

export const form = defineSlice({
  initial: {
    name: '',
    email: ''
  },
  reducers: {
    setName: (state, value: string) => {
      state.name = value
    },
    setEmail: (state, value: string) => {
      state.email = value
    }
  },
  selectors: {
    // TODO fix type
    isValid: (state: any) => state.name.length > 0 && state.email.includes('@')
  }
})