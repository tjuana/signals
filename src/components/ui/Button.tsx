type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'danger'
  className?: string
}

const base =
  'inline-flex items-center justify-center font-medium rounded-xl shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2'

const sizeMap = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-3 text-lg'
}

const variantMap = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
  secondary: 'bg-neutral-700 hover:bg-neutral-800 text-white focus:ring-neutral-500',
  danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
}

export const Button = ({
  children,
  onClick,
  size = 'md',
  variant = 'primary',
  className = ''
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${base} ${sizeMap[size]} ${variantMap[variant]} ${className}`}
    >
      {children}
    </button>
  )
}