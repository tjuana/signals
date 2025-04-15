type CardProps = {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'accent' | 'gray' | 'pink'
  className?: string
}

const sizeMap = {
  sm: 'p-4 max-w-sm',
  md: 'p-6 max-w-md',
  lg: 'p-8 max-w-lg'
}

const variantMap = {
  default: 'bg-neutral-800 text-white',
  accent: 'bg-accent-900 text-white',
  gray: 'bg-gray-800 text-white',
  pink: 'bg-pink-800 text-white'
}

export const Card = ({
  children,
  size = 'md',
  variant = 'default',
  className = ''
}: CardProps) => {
  return (
    <div className={`rounded-2xl shadow-xl ${sizeMap[size]} ${variantMap[variant]} ${className}`}>
      {children}
    </div>
  )
}