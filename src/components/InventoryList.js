import MediaItem from "./base/BaseMediaItem";
import BaseButton from "./base/BaseButton";
import useActiveRoom from "../hooks/useActiveRoom";
import { useStore } from "../store";
import useRoomInventory from "../hooks/useRoomInventory";
import BaseListSkeleton from "./base/BaseListSkeleton";


export default function InventoryList(props) {
  const { className } = props;
  const activeRoom = useActiveRoom();
  const inventory = useRoomInventory();
  const activeInventoryId = useStore((state) => state.activeInventoryId);
  const setActiveInventoryId = useStore((state) => state.setActiveInventoryId);

  const setCreateInventoryVisible = useStore((state) => state.setCreateInventoryVisible);

  // show loading
  if (!activeRoom.inventoryLoaded) return (
    <div className={`p-5`}>
      <BaseListSkeleton />
    </div>
  );

  // show add button if length 0
  if (inventory.length === 0) return (
    <div className={`p-5 text-center text-sm ${className}`}>
      <BaseButton type="secondary" onClick={() => setCreateInventoryVisible(true)}>Add item</BaseButton>
    </div>
  );

  const inventoryList = inventory.map((item) => {
    return (
      <li
        key={item.id}
        className={`flex items-center bg-white border-b border-gray-100 px-3 hover:cursor-pointer ${ item.id === activeInventoryId && 'bg-blue-100'} ${ item.id !== activeInventoryId && 'hover:bg-slate-50'}`}
        onClick={() => setActiveInventoryId(item.id)}>
        <MediaItem
          title={item.name}
          image={item.image}
          size="large"
        />
        <div className="ml-auto chevron-right"/>
      </li>
    );
  });

  return <ul className={className}>{inventoryList}</ul>;
}
