export default function BaseInput({ onChange, placeholder }) {
  return (
    <input
      onChange={(evt) => onChange(evt.target.value)}
      placeholder={placeholder}
      className="border-gray-200 border block border-solid w-full p-2"
      type="text"
    />
  );
}
