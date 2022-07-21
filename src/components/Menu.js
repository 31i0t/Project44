import MediaItem from "./MediaItem";

export default function Menu({ items }) {
  return (
    <nav>
      <ul>
        {items.map(({ name }) => (
          <li key={name} className="bg-white border-b border-gray-100 px-2 py">
            <MediaItem title={name} link={{ href: "#", text: name }} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
