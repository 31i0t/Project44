import { BASE_URL } from "../utils";

const service = {
  all(roomId) {
    return fetch(`${BASE_URL}/api/inventory?roomId=${roomId}`, {
      method: 'GET',
    });
  },
  add(roomId, name) {
    return fetch(`${BASE_URL}/api/inventory/add`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId, name })
    });
  },
  update(id, changes) {
    return fetch(`${BASE_URL}/api/inventory/update`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, ...changes })
    });
  },
  delete(id, roomId) {
    return fetch(`${BASE_URL}/api/inventory/delete`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, roomId })
    });
  }
};

const useInventoryRepository = (state) => {
  const {
    rooms,
    setRoomInventory,
    setRoomInventoryLoaded,
    updateInventory,
    deleteInventory,
    setInventory,
    setShowCreateInventoryModal,
   } = state;

  return {
    all: async (roomId) => {
      debugger
      const room = rooms[roomId];
      // return if already loaded
      if (!room || room.inventoryLoaded) return;
      // load room inventory
      const response = await service.all(roomId);
      const items = await response.json();
      setRoomInventory(items);
      setRoomInventoryLoaded(roomId);
    },

  };
}

export default useInventoryRepository;
