import BaseTitle from "./BaseTitle";
import MediaItem from "./MediaItem";
import BaseButton from "./BaseButton";
import useActiveRoom from "../hooks/useActiveRoom";
import { useStore } from "../store";
import useRoomInventory from "../hooks/useRoomInventory";


export default function InventoryList(props) {
  const { className } = props;
  const activeRoom = useActiveRoom();
  const inventory = useRoomInventory();
  const activeInventoryId = useStore((state) => state.activeInventoryId);
  const setActiveInventoryId = useStore((state) => state.setActiveInventoryId);

  const setCreateInventoryVisible = useStore((state) => state.setCreateInventoryVisible);

  const title = (
    <div className="border-b flex items-center px-3">
      <BaseTitle type="default" label={activeRoom?.name} />
      <div className="ml-auto">
        <BaseButton
          type="secondary"
          size="xs"
          onClick={() => setCreateInventoryVisible(true)}>Add Item</BaseButton>
      </div>
    </div>
  );

  // return if room not found
  if (!activeRoom) return (
    <>
      {title}
      <p>Room not found</p>
    </>
  )

  // show loading
  if (!activeRoom.inventoryLoaded) return (
    <>
      {title}
      <div className={`p-5 text-center text-sm ${className}`}>
        Loading...
      </div>
    </>
  );

  // show add button if length 0
  if (inventory.length === 0) return (
    <>
      {title}
      <div className={`p-5 text-center text-sm ${className}`}>
        <BaseButton type="secondary" onClick={() => setCreateInventoryVisible(true)}>Add item</BaseButton>
      </div>
    </>
  );

  const inventoryLayout = inventory.map((item) => {
    return (
    <li
      key={item.id}
      className={`bg-white border-b border-gray-100 hover:bg-slate-50 px-3 hover:cursor-pointer ${ item.id === activeInventoryId && 'bg-blue-300'} `}
      onClick={() => setActiveInventoryId(item.id)}>
      <MediaItem
        title={item.name}
        image={item.image}
        size="large"
      />
    </li>)
  });

  return (
    <>
      {title}
      <ul className={className}>{inventoryLayout}</ul>
    </>
  );
}
