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
        children.map((c) => cloneElement(c, {hover}))
      }
    </div>
  )
}
