export default function Button(props) {
  const {
    children,
    type = 'primary',
    classes = [],
    onClick,
    disabled,
  } = props;

  const types = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-25 disabled:cursor-not-allowed',
    secondary: 'bg-white text-grey hover:bg-gray-100 border border-gray-300',
    white: 'bg-white text-grey hover:bg-gray-100',
  }

  return (
    <button
      disabled={disabled}
      className={`py-2 px-4 rounded ${types[type]} ${classes.join(' ') }`}
      onClick={onClick}>
      {children}
    </button>
  );
}
