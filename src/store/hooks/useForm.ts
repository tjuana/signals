import { form } from '@/store/formSlice'
import { useStore } from '@/core/hooks/useStore'

export const useForm = useStore(form)