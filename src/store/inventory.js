import roomRepository from '../services/roomRepository';
import inventoryRepository from '../services/inventoryRepository';

export const createInventoryStore = (set, get) => ({
  inventory: {},
  activeInventoryId: null,
  showCreateInventoryModal: false,

  // actions
  setActiveInventoryId: async (id) => {
    // get().fetchRoomInventory(id);
    set(() => ({ activeInventoryId: id }));
  },
  setShowCreateInventoryModal: (visible) => set(() => ({ showCreateInventoryModal: visible })),
  setInventory: (item) => set((state) => {
    const found = state.inventory[item.id];
    // return if already exist
    if (found) return;

    // create updated inventory object
    const updatedInventory = { ...state.inventory, [item.id]: item };

    // add inventory to room
    const foundRoom = state.rooms[item.roomId];
    if (!foundRoom) throw new Error('Inventory does not belong to any room');

    let roomToupdate = foundRoom;

    // add to room if not exist
    if (Array.isArray(foundRoom.inventory) && !foundRoom.inventory.includes(item.id)) {
      roomToupdate = { ...foundRoom, inventory: [...foundRoom.inventory, item.id ] };
    }

    // update rooms
    const updatedRooms = { ...state.rooms, [roomToupdate.id]: roomToupdate };

    // return updates
    return {
      rooms: updatedRooms,
      inventory: updatedInventory,
    };
  }),
  updateInventory: (id, changes) => {
    set((state) => ({
      inventory: {
        ...state.inventory,
        [id]: {
          ...state.inventory[id],
          ...changes,
        },
      }
    }));
  },
  deleteInventory: (collection, id) => {
    set((state) => {
      const col = { ...state[collection] };
      delete col[id];
      return {
        [collection]: col,
      }
    });
  },

  fetchInventory: async (roomId) => {
    try {
      const room = get().rooms[roomId];
      // return if already loaded
      if (room.inventoryLoaded) return;
      // load room inventory
      const response = await inventoryRepository.all(roomId);
      const items = await response.json();
      get().setInventoryItems(items);
      get().setInventoryLoaded(roomId);
    } catch (err) {
      console.error(err);
    }
  },
  pushAddInventory: async (value) => {
    const room = await service.add(activeRoom.id, value);
    get().setInventory(await room.json());
  },
  pushUpdateInventory: async (id, changes) => {
    const item = inventory[id];
    try {
      get().updateInventory(id, changes);
      await service.update(id, changes);
    } catch (err) {
      get().updateInventory(id, item);
    }
  },
  pushDeleteInventory: async (id) => {
    const item = get().inventory[id];
    try {
      get().deleteInventory(id)
      await service.delete(id, item.roomId);
    } catch (err) {
      get().updateInventory(id, item);
    }
  }
});

export default createInventoryStore;
