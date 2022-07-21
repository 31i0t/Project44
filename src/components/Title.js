import { useCallback, useRef } from "react";

export default function Title({
  type = 3,
  add,
  label,
  onAdd,
  classes = [],
  dashed = true,
}) {
  const inputRef = useRef(null);
  const tags = ["h1", "h2", "h3", "h4", "h5", "h6"];
  const sizes = [
    "text-3xl",
    "text-2xl",
    "text-xl",
    "text-xl",
    "text-base",
    "text-sm",
  ];
  const Tag = tags[type - 1];
  const size = sizes[type - 1];
  let color = "";
  if (type === 4 || type === 5) {
    color = "text-gray-500";
  }

  const onAddClicked = useCallback(() => {
    const value = inputRef.current.value;
    if (!value) {
      return;
    }
    onAdd({ name: value });
  }, [onAdd]);

  return (
    <>
      <div
        className={`flex ${
          dashed && "border-b border-gray-100"
        } ${color} ${classes.join(" ")}`}
      >
        <Tag className={`${size} py-2`}>{label}</Tag>
      </div>
      <div
        className={`flex ${
          dashed && "border-b border-gray-100"
        } ${color} ${classes.join(" ")}`}
      >
        <input
          ref={inputRef}
          className="border-gray-6-- border-2"
          type="text"
        />
        {add && (
          <button
            className="ml-auto p-2 hover:bg-gray-100"
            onClick={() => onAddClicked()}
          >
            +
          </button>
        )}
      </div>
    </>
  );
}
