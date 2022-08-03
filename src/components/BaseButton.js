export default function Button({children, type = 'primary', classes = [], onClick}) {
  const types = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-white text-grey hover:bg-gray-100'
  }
  return (
    <button
      className={`py-2 px-4 rounded ${types[type]} ${classes.join(' ') }`}
      onClick={onClick}>
      {children}
    </button>
  );
}
