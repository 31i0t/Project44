import MediaItem from "./MediaItem";

export default function InventoryList({ items }) {
  const inventory = items.map((item) => {
    return (
      <li key={item.id} className="bg-white border-b border-gray-100">
        <MediaItem
          title={item.name}
          image={{ src: "https://placekitten.com/200/300" }}
          size="large"
        />
      </li>
    );
  });

  return <ul className="flex flex-col gap-2">{inventory}</ul>;
}
