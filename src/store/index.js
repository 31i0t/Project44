import create from 'zustand'

export const useStore = create((set, get) => ({
  activeRoomId: null,
  setActiveRoomId: (id) => set(() => ({ activeRoomId: id })),

  rooms: [],
  addRoom: (room) => {
    set((state) => ({ rooms: [...state.rooms, room] }));
    get().setActiveRoomId(room.id);
  },
  setRooms: (rooms) => set(() => ({ rooms })),

  addInventoryItem: (item) => set((state) => {
    const roomIndex = state.rooms.findIndex(r => r.id === item.roomId);
    const room = { ...state.rooms[roomIndex] };
    // update inventory
    room.inventory = [...room.inventory, item];
    // update rooms
    return {
      rooms: [
        ...state.rooms.slice(0, roomIndex),
        room,
        ...state.rooms.slice(roomIndex + 1),
      ],
    };
  }),

  createRoomVisible: false,
  setCreateRoomVisible:  (visible) => set(() => ({ createRoomVisible: visible })),

  createInventoryVisible: false,
  setCreateInventoryVisible: (visible) => set(() => ({ createInventoryVisible: visible })),
}));
