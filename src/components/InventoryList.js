import BaseTitle from "./BaseTitle";
import MediaItem from "./MediaItem";
import BaseButton from "./BaseButton";
import useActiveRoom from "../hooks/useActiveRoom";
import { useStore } from "../store";


export default function InventoryList() {
  const activeRoom = useActiveRoom();
  const setCreateInventoryVisible = useStore((state) => state.setCreateInventoryVisible);

  const titleLayout = <BaseTitle label="Inventory" add={true} classes={["pl-2"]} onAdd={() => setCreateInventoryVisible(true)} />

  if (!activeRoom) return (
    <>
      { titleLayout }
      <div className="p-5 text-center text-sm">
        <BaseButton type="secondary" onClick={() => setCreateInventoryVisible(true)}>Add items</BaseButton>
      </div>
    </>
  );

  if (!activeRoom) return (
    <>
      { titleLayout }
      <p>Room not found</p>
    </>
  )

  const inventory = activeRoom.inventory || [];
  const inventoryLayout = inventory.map((item) => {
    return (<li key={item.id} className="bg-white border-b border-gray-100">
      <MediaItem
        title={item.name}
        image={{ src: "https://placekitten.com/200/300" }}
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
