export const createInventoryStore = (set, get) => ({
  inventory: {},
  activeInventoryId: null,
  showCreateInventoryModal: false,

  // actions
  setActiveInventoryId: (id) => set({ activeInventoryId: id }),
  setShowCreateInventoryModal: (visible) => set(() => ({ showCreateInventoryModal: visible })),
  setInventory: (item) => set((state) => {
    const found = state.inventory[item.id];
    // return if already exist
    if (found) return;
    // create updated inventory object
    const updatedInventory = { ...state.inventory, [item.id]: item };
    // return updates
    return {
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
  deleteInventory: (id, deleteFromRoom) => {
    const inventory = { ...get().inventory };
    const asset = inventory[id];
    if (deleteFromRoom) {
      get().deleteInventoryFromRoom(id, asset.roomId);
    }
    delete inventory[id];
    get().setActiveInventoryId(null);
    set({ inventory });
  },
  deleteInventoryFromRoom: (inventoryId, roomId) => {
    const room = get().rooms[roomId];
    if (Array.isArray(room.inventory)) {
      set((state) => {
        const updatedRoomInventory = room.inventory.filter((id) => id !== inventoryId);
        set({
          rooms: {
            ...state.rooms,
            [roomId]: {
              ...room,
              inventory: updatedRoomInventory,
            },
          },
        });
      });
    }
  },
});

export default createInventoryStore;
