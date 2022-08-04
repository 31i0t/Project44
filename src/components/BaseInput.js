export default function BaseInput(props) {
  const { value, onChange, placeholder, error } = props;

  const classes = {
    normal: 'border-gray-200 border block border-solid w-full p-2 outline-none',
    error:  'border-red-500 border block border-solid w-full p-2 outline-none',
  }
  const inputClass = error ? classes.error : classes.normal;

  return (
    <>
      <input
        value={value}
        placeholder={placeholder}
        className={inputClass}
        type="text"
        onChange={(evt) => onChange(evt.target.value)}
      />
      { error && <p className="text-red-500 text-sm absolute">{ error }</p> }
    </>
  );
}
