import { useStore } from '../store';

const useRoomInventory = () => {
  const room = useStore((state) => state.rooms[state.activeRoomId]);
  const inventory = useStore((state) => state.inventory);
  const roomInventoryRef = room?.inventory || [];
  const roomInventory = roomInventoryRef.map((id) => inventory[id]).filter((item) => item !== undefined);
  return roomInventory;
}

export default useRoomInventory;
