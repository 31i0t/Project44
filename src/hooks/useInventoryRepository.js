/**
 * Handles inventory db calls
 */
import toast from 'react-hot-toast';
import { useStore } from "../store";
import { BASE_URL } from "../utils";
import useActiveRoom from "../hooks/useActiveRoom";

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

export const useFetchInventory = () => {
  const rooms = useStore(state => state.rooms);
  const inventory = useStore(state => state.inventory);
  const setRoomInventory = useStore(state => state.setRoomInventory);
  const setRoomInventoryLoaded = useStore(state => state.setRoomInventoryLoaded);
  const setRooms = useStore(state => state.setRooms);
  const setInventory = useStore(state => state.setInventory);

  return async (roomId) => {
    const room = rooms[roomId];
    // return if already loaded
    if (room.inventoryLoaded) return;

    try {
      const response = await service.all(roomId);
      const assets = await response.json();
      if (response.status !== 200) throw new Error(assets.error.message);
      setRoomInventory(assets);
      setRoomInventoryLoaded(roomId);
    } catch (err) {
      // restore state
      setRooms(rooms);
      setInventory(inventory);
      // log for devs
      console.error(err);
      // notifiy user
      toast.error(
        "Something went wrong! Please refresh the page or contact our support team if the issue persist.",
        { duration: 4000 }
      );
    }
  }
};

export const useAddInventory = () => {
  const rooms = useStore(state => state.rooms);
  const activeRoom = useActiveRoom();
  const inventory = useStore(state => state.inventory);
  const setActiveInventoryId = useStore(state => state.setActiveInventoryId);
  const setInventory = useStore(state => state.setInventory);
  const setRooms = useStore(state => state.setRooms);
  const setRoomInventory = useStore(state => state.setRoomInventory);

  return async (value) => {
    const toastId = toast.loading('Creating asset...');
    try {
      const response = await service.add(activeRoom.id, value);
      const asset = await response.json();
      if (response.status !== 200) throw new Error(assets.error.message);
      setRoomInventory([asset]);
      setActiveInventoryId(asset.id);
      toast.success(<b>Asset created successfully!</b>, { id: toastId });
    } catch (err) {
      // restore state
      setRooms(rooms);
      setInventory(inventory);
      // log for devs
      console.error(err);
      // notifiy user
      toast.error(
        `There was an error trying to create asset "${ value }", please try again.`,
        { id: toastId, duration: 4000 }
      );
    }
  }
};

export const useUpdateInventory = () => {
  const inventory = useStore(state => state.inventory);
  const updateInventory = useStore(state => state.updateInventory);
  const setInventory = useStore(state => state.setInventory);
  return async(id, changes) => {
    const toastId = toast.loading('Updating asset...');
    try {
      const response = await service.update(id, changes);
      const data = response.json();
      if (response.status !== 200) throw new Error(data.error.message);
      updateInventory(id, changes);
      toast.success(<b>Asset updated successfully!</b>, { id: toastId });
    } catch (err) {
      // restore state
      setInventory(inventory);
      // log for devs
      console.error(err);
      // notifiy user
      toast.error(
       `There was an error trying to update asset "${ value }", please try again.`,
        { id: toastId, duration: 4000 }
      );
    }
  }
};

export const useDeleteInventory = () => {
  const rooms = useStore(state => state.rooms);
  const inventory = useStore(state => state.inventory);
  const setInventory = useStore(state => state.setInventory);
  const setRooms = useStore(state => state.setRooms);
  const deleteInventory = useStore(state => state.deleteInventory);

  return async (id) => {
    const toastId = toast.loading('Deleting asset...');
    const asset = inventory[id];

    try {
      const response = await service.delete(id, asset.roomId);
      const data = response.json();
      if (response.status !== 200) throw new Error(data.error.message);
      deleteInventory(id, true);
      toast.success(<b>Asset deleted successfully!</b>, { id: toastId });
    } catch (err) {
      // restore state
      setRooms(rooms);
      setInventory(inventory);
      // log for devs
      console.error(err);
      // notifiy user
      toast.error(
        `There was an error trying to delete asset "${ asset.name }", please try again.</span>`,
        { id: toastId, duration: 4000 }
      );
    }
  }
};
