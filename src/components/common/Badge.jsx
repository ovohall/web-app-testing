const variants = {
  blue: 'bg-gsnsd-blue/10 text-gsnsd-blue',
  magenta: 'bg-gsnsd-magenta/10 text-gsnsd-magenta',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  danger: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
  gray: 'bg-gray-100 text-gray-800',
}

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-sm',
  lg: 'px-3 py-1 text-sm',
}

const Badge = ({
  children,
  variant = 'blue',
  size = 'md',
  className = '',
  icon: Icon,
  ...props
}) => {
  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-full font-medium
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  )
}

export default Badge
