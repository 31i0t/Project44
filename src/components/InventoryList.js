import BaseTitle from "./BaseTitle";
import MediaItem from "./MediaItem";
import BaseButton from "./BaseButton";
import useActiveRoom from "../hooks/useActiveRoom";
import { useStore } from "../store";
import useRoomInventory from "../hooks/useRoomInventory";


export default function InventoryList() {
  const activeRoom = useActiveRoom();
  const inventory = useRoomInventory();
  
  const setCreateInventoryVisible = useStore((state) => state.setCreateInventoryVisible);

  const titleLayout = <BaseTitle label="Inventory" add={true} classes={["pl-2"]} onAdd={() => setCreateInventoryVisible(true)} />

  // return if room not found
  if (!activeRoom) return (
    <>
      { titleLayout }
      <p>Room not found</p>
    </>
  )

  // show loading
  if (!activeRoom.inventoryLoaded) return (
    <>
      { titleLayout }
      <div className="p-5 text-center text-sm">
        Loading...
      </div>
    </>
  );

  // show add button if length 0
  if (inventory.length === 0) return (
    <>
      { titleLayout }
      <div className="p-5 text-center text-sm">
        <BaseButton type="secondary" onClick={() => setCreateInventoryVisible(true)}>Add items</BaseButton>
      </div>
    </>
  );


  const inventoryLayout = inventory.map((item) => {
    return (<li key={item.id} className="bg-white border-b border-gray-100">
      <MediaItem
        title={item.name}
        image={item.image}
        size="large"
      />
    </li>)
  });

  return (
    <>
      { titleLayout }
      <ul className="flex flex-col gap-2">{inventoryLayout}</ul>
    </>
  );
}
