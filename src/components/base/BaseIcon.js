import { useState } from "react";

const icons = {
  edit: {
    path: "M12.276 1.33325C12.1055 1.33325 11.9347 1.39823 11.8047 1.52856L10.6667 2.66659L13.3333 5.33325L14.4714 4.19523C14.732 3.93456 14.732 3.51252 14.4714 3.25252L12.7474 1.52856C12.6171 1.39823 12.4466 1.33325 12.276 1.33325ZM9.66667 3.66659L2 11.3333V13.9999H4.66667L12.3333 6.33325L9.66667 3.66659Z",
  },
}

export default function BaseIcon(props) {
  const { name, fill = "#666", fillHover = "#999", hover:parentHover, className = '' } = props;
  const { path } = icons[name];
  const [localHover, setLocalHover] = useState(false);

  const hover = parentHover !== undefined ? parentHover : localHover;

  return (
    <div
      className={className}
      onMouseEnter={() => setLocalHover(true)}
      onMouseLeave={() => setLocalHover(false)}>
      <svg x="0px" y="0px"
        height="18"
        width="18"
        viewBox="0 0 18 18" xmlSpace="preserve">
        <g>
          <path d={path} fill={hover ? fillHover : fill}/>
        </g>
      </svg>
    </div>
  )
}
