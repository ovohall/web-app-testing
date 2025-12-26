import { forwardRef } from 'react'

const variants = {
  primary: 'bg-gsnsd-blue text-white hover:bg-gsnsd-blue-dark focus:ring-gsnsd-blue',
  secondary: 'bg-gsnsd-magenta text-white hover:bg-gsnsd-magenta-dark focus:ring-gsnsd-magenta',
  outline: 'border-2 border-gsnsd-blue text-gsnsd-blue hover:bg-gsnsd-blue hover:text-white',
  outlineMagenta: 'border-2 border-gsnsd-magenta text-gsnsd-magenta hover:bg-gsnsd-magenta hover:text-white',
  ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
  danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
  success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl',
}

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  type = 'button',
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 rounded-lg font-medium
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <span className="spinner" />
          <span>Chargement...</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
        </>
      )}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
