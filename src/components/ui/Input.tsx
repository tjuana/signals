import React, { useState } from 'react'
import clsx from 'clsx'

type InputProps = {
  id: string
  label: string
  value: string
  onChange: (val: string) => void
  error?: string
  type?: 'text' | 'email' | 'password' | 'number'
  onBlur?: () => void
  onFocus?: () => void
  autoComplete?: string
  autoFocus?: boolean
  refValue?: React.RefObject<HTMLInputElement>
  refError?: React.RefObject<HTMLParagraphElement | null>
}

export const Input: React.FC<InputProps> = ({
  id,
  label,
  value,
  onChange,
  error,
  type = 'text',
  onBlur,
  onFocus,
  autoComplete = 'off',
  autoFocus = false,
  refValue,
  refError
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const shouldFloat = isFocused || value.length > 0

  return (
    <div className="mb-4 relative bg-neutral-100 dark:bg-neutral-900">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => {
          setIsFocused(true)
          onFocus?.()
        }}
        onBlur={() => {
          setIsFocused(false)
          onBlur?.()
        }}
        ref={refValue}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={clsx(
          'peer w-full px-3 pt-6 pb-2 text-sm border rounded-md shadow-sm focus:outline-none transition-all text-neutral-900',
          error
            ? 'border-red-500 focus:border-red-500'
            : 'border-gray-300 focus:border-blue-500'
        )}
        placeholder=" "
        autoComplete={autoComplete}
        autoFocus={autoFocus}
      />
      <label
        htmlFor={id}
        className={clsx(
          'absolute left-3 text-gray-500 text-sm transition-all pointer-events-none',
          shouldFloat ? 'top-1 text-xs' : 'top-3.5'
        )}
      >
        {label}
      </label>
      <p
        ref={refError}
        id={`${id}-error`}
        className={clsx('text-sm mt-1', error ? 'text-red-500' : 'invisible h-5')}
      >
        {error ?? 'placeholder'}
      </p>
    </div>
  )
}