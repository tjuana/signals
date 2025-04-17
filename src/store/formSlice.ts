import { defineSlice } from '@/core/store/defineSlice'

interface FormState {
  name: string,
  email: string
}

const initial = {
  name: '',
  email: ''
}

export const form = defineSlice<FormState>({
  initial,
  reducers: {
    setName: (state, value: string) => {
      state.name = value
    },
    setEmail: (state, value: string) => {
      state.email = value
    }
  },
  selectors: {
    isValid: (state) => state.name.length > 0 && state.email.includes('@')
  }
})