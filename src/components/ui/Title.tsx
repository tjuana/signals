type TitleProps = {
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}

const map = {
  h1: 'text-3xl md:text-4xl font-bold text-accent-300',
  h2: 'text-2xl md:text-3xl font-bold text-blue-400',
  h3: 'text-xl font-semibold text-neutral-300'
}

export const Title = ({ children, as = 'h2', className = '' }: TitleProps) => {
  const Tag = as
  return <Tag className={`${map[as]} ${className}`}>{children}</Tag>
}