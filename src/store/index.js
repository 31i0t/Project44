import create from 'zustand'
import inventoryRepository from '../services/inventoryRepository';
import roomRepository from '../services/roomRepository';

const dbConfig = {
  room: ['rooms', roomRepository],
  inventory: ['inventory', inventoryRepository],
}

export const useStore = create((set, get) => ({
  activeRoomId: null,
  setActiveRoomId: async (id) => {
    get().loadRoomInventory(id);
    set(() => ({ activeRoomId: id }));
  },
  activeInventoryId: null,
  setActiveInventoryId: async (id) => {
    // get().loadRoomInventory(id);
    set(() => ({ activeInventoryId: id }));
  },
  rooms: {},
  inventory: {},
  loadRoomInventory: async (roomId) => {
    const room = get().rooms[roomId];
    // return if already loaded
    if (room.inventoryLoaded) return;
    // load room inventory
    const response = await inventoryRepository.all(roomId);
    const items = await response.json();
    get().setInventoryItems(items);
    get().setInventoryLoaded(roomId);
  },
  setInventoryLoaded: (roomId) => set((state) => {
    const rooms = state.rooms;
    const room = {...rooms[roomId], inventoryLoaded: true };
    return {
      rooms: { ...rooms, [roomId]: room },
    };
  }),
  addRoom: (room) => {
    set((state) => ({ rooms: { ...state.rooms, [room.id]: room } }));
    get().setActiveRoomId(room.id);
  },
  setRooms: (rooms) => set(() => {
    // convert array to object
    // { roomId: roomData }
    return {
      rooms: rooms.reduce((output, room) => {
        output[room.id] = room;
        return output;
      }, {}),
    };
  }),


  setInventoryItems: (items = []) => items.forEach((item) => get().addInventoryItem(item)),
  addInventoryItem: (item) => set((state) => {
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

  createRoomVisible: false,
  setCreateRoomVisible:  (visible) => set(() => ({ createRoomVisible: visible })),

  createInventoryVisible: false,
  setCreateInventoryVisible: (visible) => set(() => ({ createInventoryVisible: visible })),
  loadingRooms: false,
  setLoadingRooms: (value) => set({ loadingRooms: value }),
  editRoomEnabled: false,
  setEditRoomEnabled: (value) => set({ editRoomEnabled: value }),
  setUpdatedRoom: (id, changes) => {
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
  setUpdatedItem: (collection, id, changes) => {
    set((state) => ({
      [collection]: {
        ...state[collection],
        [id]: {
          ...state[collection][id],
          ...changes,
        },
      }
    }));
  },
  setDeletedItem: (id) => {
    set((state) => {
      const rooms = { ...state.rooms };
      delete rooms[id];
      return {
        rooms,
      }
    });
  },
  updateItem: async (type, id, changes) => {
    const [collection, repository] = dbConfig[type];
    const prevState = get()[collection][id];
    try {
      get().setUpdatedItem(collection, id, changes);
      await repository.update(id, changes);
    } catch (err) {
      get().setUpdatedItem(collection, id, prevState);
    }
  },
  deleteRoom: async (id, changes) => {
    const prevState = get().rooms[id];
    try {
      get().setDeletedItem(id)
      await roomRepository.delete(id);
    } catch (err) {
      // restore
      get().setUpdatedItem(id, prevState);
    }
  }
}));
