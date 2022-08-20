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
  setLoadingRooms(true);
  return async () => {
    try {
      const res = await service.all();
      const rooms = await res.json();
      if (rooms.length) {
        setRooms(rooms);
        setActiveRoomId(rooms[0].id);
      }
      setLoadingRooms(false);
    } catch (err) {
      // log for devs
      console.log(err);
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
      toast.success(<b>Room created succesfully!</b>, { id: toastId });
    } catch (err) {
      // restore state
      setRooms(rooms);
      // log for devs
      console.error(err);
      // notifiy user
      toast.error(
        <b>There was an error trying to create room &quot;{ value }&quot;, please try again.</b>, 
        { id: toastId, duration: 4000 }
      );
    }
  }
};

const useUpdateRoom = async (id, changes) => {
  const rooms = useStore(state => state.rooms);
  const updateRoom = useStore(state => state.updateRoom);

  const room = rooms[id];
  try {
    updateRoom(id, changes);
    await service.update(id, changes);
  } catch (err) {
    console.error(err);
    updateRoom(id, room);
  }
};

export const useDeleteRoom = async (id) => {
  const toastId = toast.loading('Deleting room...');
  const rooms = useStore(state => state.rooms);
  const deleteRoom = useStore(state => state.deleteRoom);
  const room = rooms[id];
  debugger
  return async () => {
    try {
      deleteRoom(id)
      await service.delete(id);
      toast.success(<b>Room deleted succesfully!</b>, { id: toastId });
    } catch (err) {
      // restore state
      updateRoom(id, room);
      // log for devs
      console.error(err);
      // notifiy user
      toast.error(
        <b>There was an error trying to delete room &quot;{ room.name }&quot;, please try again.</b>, 
        { id: toastId, duration: 4000 }
      );
    }
  }
};
