import roomRepository from '../services/roomRepository';

const createRoomStore = (set, get) => ({
  activeRoomId: null,
  showCreateRoomModal: false,
  editRoomEnabled: false,
  loadingRooms: false,
  rooms: {},

  setActiveRoomId: async (id) => {
    set(() => ({ activeRoomId: id }));
    get().setActiveInventoryId(null);
  },
  setShowCreateRoomModal:  (visible) => set(() => ({ showCreateRoomModal: visible })),
  setEditRoomEnabled: (value) => set({ editRoomEnabled: value }),
  setLoadingRooms: (value) => set({ loadingRooms: value }),

  setRoomInventory: (items = []) => items.forEach((item) => get().setInventory(item)),
  setRoomInventoryLoaded: (roomId) => set((state) => {
    const rooms = state.rooms;
    const room = {...rooms[roomId], inventoryLoaded: true };
    return {
      rooms: { ...rooms, [roomId]: room },
    };
  }),

  setRooms: (rooms) => set(() => {
    // store rooms as object, for easier management
    return {
      rooms: Array.isArray(rooms) ? rooms.reduce((output, room) => {
        output[room.id] = room;
        return output;
      }, {}) : rooms,
    };
  }),
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
