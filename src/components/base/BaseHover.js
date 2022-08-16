import { useState, cloneElement } from "react";

export default function BaseIcon(props) {
  const { children, className = '', onClick = () => '' } = props;
  const [hover, setHover] = useState(false);

  return (
    <div
      className={className}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      {
        children.map((child, index) => cloneElement(child, { key: index, hover}))
      }
    </div>
  )
}
