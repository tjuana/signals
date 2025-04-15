import { useRenderCount } from '@/hooks/useRenderCount'

export const RenderCount = () => {
  const renders = useRenderCount()
  return (
    <p className="text-sm text-gray-400">Renders: {renders}</p>
  )
}
