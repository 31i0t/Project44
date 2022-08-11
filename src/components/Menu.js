import MediaItem from "./MediaItem";

export default function Menu({ items, active, onSelect, className }) {
  return (
    <nav>
      <ul>
        {items.map(({ id, name }) => (
          <li
            key={id}
            className={`${active === id && 'bg-blue-300'} border-b border-gray-100 px-2 py ${className}`}
            onClick={ () => onSelect(id) }>
            <MediaItem title={name} link={{ href: "#", text: name }} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
