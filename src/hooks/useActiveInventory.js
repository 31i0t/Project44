import { useStore } from '../store';

/**
 * Getter. Returns Inventory object.
 */
const useActiveInventory = () => {
  return useStore((state) => state.inventory[state.activeInventoryId]);
}

export default useActiveInventory;
