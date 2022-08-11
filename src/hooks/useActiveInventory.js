import { useStore } from '../store';

const useActiveInventory = () => {
  return useStore((state) => state.inventory[state.activeInventoryId]);
}

export default useActiveInventory;
