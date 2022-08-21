const createRoomStore = (set, get) => ({
  activeRoomId: null,
  showCreateRoomModal: false,
  editRoomEnabled: false,
  loadingRooms: true,
  rooms: {},

  setActiveRoomId: (id) => {
    set({ activeRoomId: id });
    get().setActiveInventoryId(null);
  },
  setShowCreateRoomModal:  (visible) => set(() => ({ showCreateRoomModal: visible })),
  setEditRoomEnabled: (value) => set({ editRoomEnabled: value }),
  setLoadingRooms: (value) => set({ loadingRooms: value }),

  setRoomInventory: (items = []) => items.forEach((item) => {
    let room = get().rooms[item.roomId];
    if (!room) throw new Error('Inventory does not belong to any room');

    // register item in inventory store
    get().setInventory(item);

    // register item in room if not registered yet
    if (Array.isArray(room.inventory) && !room.inventory.includes(item.id)) {
      room = { ...room, inventory: [...room.inventory, item.id ] };
    }

    // update rooms
    set((state) => ({
      rooms:{ ...state.rooms, [room.id]: room },
    }));
  }),
  setRoomInventoryLoaded: (roomId) => set((state) => {
    const rooms = state.rooms;
    const room = {...rooms[roomId], inventoryLoaded: true };
    return {
      rooms: { ...rooms, [roomId]: room },
    };
  }),

  setRooms: (rooms) => set(() => ({ rooms })),
  updateRoom: (id, changes) => {
    set((state) => ({
      rooms: {
        ...state.rooms,
        [id]: {
          ...state.rooms[id],
          ...changes,
        },
      }
    }));
  },
  deleteRoom: (id) => {
    const rooms = get().rooms;
    const room = rooms[id];
    if (Array.isArray(room.inventory)) {
      room.inventory.forEach(id => get().deleteInventory(id));
    }
    set((state) => {
      const rooms = { ...state.rooms };
      delete rooms[id];
      return {
        rooms,
      }
    });
  },
});

export default createRoomStore;
