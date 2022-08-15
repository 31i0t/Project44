export default function BaseInput(props) {
  const { value, onChange = () => '', onKeyDown = () => '', placeholder, error, className } = props;

  const classes = {
    normal: 'border-gray-200 border block border-solid w-full p-2 outline-none appearance-none',
    error:  'border-red-500 border block border-solid w-full p-2 outline-none appearance-none',
  }
  const inputClass = error ? classes.error : classes.normal;

  return (
    <div className={`w-full relative ${className}`}>
      <input
        value={value}
        placeholder={placeholder}
        className={`${inputClass}`}
        type="text"
        onKeyDown={onKeyDown}
        onChange={onChange}
      />
      { error && <p className="text-red-500 absolute -top-2 text-xs left-1 bg-white px-1">{ error }</p> }
    </div>
  );
}
