/**
 * Handles inventory db calls
 */

import toast from 'react-hot-toast';
import { useStore } from "../store";
import { BASE_URL } from "../utils";

const service = {
  all() {
    return fetch(`${BASE_URL}/api/rooms`, {
      method: 'GET',
    });
  },
  add(name) {
    return fetch(`${BASE_URL}/api/rooms/add`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name })
    });
  },
  update(id, changes) {
    return fetch(`${BASE_URL}/api/rooms/update`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, ...changes })
    });
  },
  delete(id) {
    return fetch(`${BASE_URL}/api/rooms/delete`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id })
    });
  }
};

export const useFetchRooms = () => {
  const setLoadingRooms = useStore(state => state.setLoadingRooms);
  const setRooms = useStore(state => state.setRooms);
  const setActiveRoomId = useStore(state => state.setActiveRoomId);
  return async () => {
    setLoadingRooms(true);
    try {
      const res = await service.all();
      const rooms = await res.json();
      if (rooms.length) {
        // convert array to object for easier manipulation
        const roomsObj = rooms.reduce((output, room) => {
          output[room.id] = room;
          return output;
        }, {});
        setRooms(roomsObj);
        setActiveRoomId(rooms[0].id);
      }
      setLoadingRooms(false);
    } catch (err) {
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

export const useAddRoom = () => {
  const rooms = useStore(state => state.rooms);
  const updateRoom = useStore(state => state.updateRoom);
  const setActiveRoomId = useStore(state => state.setActiveRoomId);
  const setRooms = useStore(state => state.setRooms);

  return async (value) => {
    const toastId = toast.loading('Creating room...');
    try {
      const response = await service.add(value);
      const room = await response.json();
      updateRoom(room.id, room);
      setActiveRoomId(room.id);
      toast.success(<b>Room created successfully!</b>, { id: toastId });
    } catch (err) {
      // restore state
      setRooms(rooms);
      // log for devs
      console.error(err);
      // notifiy user
      toast.error(
        `There was an error trying to create room "${ value }", please try again.`,
        { id: toastId, duration: 4000 }
      );
    }
  }
};

export const useUpdateRoom = () => {
  const rooms = useStore(state => state.rooms);
  const updateRoom = useStore(state => state.updateRoom);
  const setRooms = useStore(state => state.setRooms);
  return async(id, changes) => {
    const toastId = toast.loading('Updating room...');
    try {
      await service.update(id, changes);
      updateRoom(id, changes);
      toast.success(<b>Room updated successfully!</b>, { id: toastId });
    } catch (err) {
      // restore state
      setRooms(rooms);
      // log for devs
      console.error(err);
      // notifiy user
      toast.error(
        `There was an error trying to update room "${ value }", please try again.`,
        { id: toastId, duration: 4000 }
      );
    }
  }
};

export const useDeleteRoom = () => {
  const rooms = useStore(state => state.rooms);
  const deleteRoom = useStore(state => state.deleteRoom);
  const setRooms = useStore(state => state.setRooms);
  return async (id) => {
    const toastId = toast.loading('Deleting room...');
    const room = rooms[id];
    try {
      await service.delete(id);
      deleteRoom(id)
      toast.success(<b>Room deleted successfully!</b>, { id: toastId });
    } catch (err) {
      // restore state
      setRooms(rooms);
      // log for devs
      console.error(err);
      // notifiy user
      toast.error(
        `There was an error trying to delete room "${ room.name }", please try again.</span>`,
        { id: toastId, duration: 4000 }
      );
    }
  }
};
