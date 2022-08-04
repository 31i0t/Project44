import create from 'zustand'

export const useStore = create((set) => ({
  rooms: [],
  setRooms: (rooms) => set(() => ({ rooms })),
  createRoomVisible: false,
  setCreateRoomVisible:  (visible) => set(() => ({ createRoomVisible: visible })),
}));
