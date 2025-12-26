const Loader = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4',
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`
          ${sizes[size]}
          border-gsnsd-blue border-t-transparent
          rounded-full animate-spin
        `}
      />
    </div>
  )
}

export const PageLoader = () => (
  <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="text-center">
      <Loader size="xl" />
      <p className="mt-4 text-gray-600 font-medium">Chargement...</p>
    </div>
  </div>
)

export const SectionLoader = ({ text = 'Chargement...' }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <Loader size="lg" />
    <p className="mt-4 text-gray-500">{text}</p>
  </div>
)

export default Loader
