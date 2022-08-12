export default function BaseButton(props) {
  const {
    children,
    type = 'primary',
    className,
    onClick,
    disabled,
    size = 'default',
  } = props;

  const types = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-25 disabled:cursor-not-allowed',
    secondary: 'bg-white text-grey hover:bg-gray-100 border border-gray-300 disabled:opacity-25 disabled:cursor-not-allowed',
    'danger-outline': 'bg-white text-red-500 hover:bg-red-100 border border-red-300 disabled:opacity-25 disabled:cursor-not-allowed',
    'danger-blank': 'bg-white text-red-500 hover:bg-red-100 disabled:opacity-25 disabled:cursor-not-allowed',
    blank: 'bg-white text-grey hover:bg-gray-100 disabled:opacity-25 disabled:cursor-not-allowed',
    success: 'bg-teal-400 text-white hover:bg-teal-500 disabled:opacity-25 disabled:cursor-not-allowed',
  }

  const sizeClass = {
    xs: 'py-1 px-2 text-xs',
    sm: 'py-2 px-2 text-sm ',
    default: 'py-2 px-4',
  }

  return (
    <button
      disabled={disabled}
      className={`rounded ${types[type]} ${sizeClass[size]} ${className}`}
      onClick={onClick}>
      {children}
    </button>
  );
}
