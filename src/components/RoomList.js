import { useEffect } from "react";
import { useStore } from "../store";
import roomRepository from "../services/roomRepository";

import BaseMediaItem from "./base/BaseMediaItem";
import BaseCard from "./base/BaseCard";
import BaseButton from "./base/BaseButton";
import BaseListSkeleton from "./base/BaseListSkeleton";

export default function RoomList() {
  const activeRoomId = useStore((state) => state.activeRoomId);
  const rooms = useStore((state) => Object.values(state.rooms));
  const loadingRooms = useStore((state) => state.loadingRooms);
  const setRooms = useStore((state) => state.setRooms);
  const setCreateRoomVisible = useStore((state) => state.setCreateRoomVisible);
  const setLoadingRooms = useStore((state) => state.setLoadingRooms);
  const setActiveRoomId = useStore((state) => state.setActiveRoomId);
  const setActiveInventoryId = useStore((state) => state.setActiveInventoryId);

  const setAllRooms = async() => {
    setLoadingRooms(true);
    const res = await roomRepository.all();
    const rooms = await res.json();
    if (rooms.length) {
      setRooms(rooms);
      setActiveRoomId(rooms[0].id);
    }
    setLoadingRooms(false);
  };

  useEffect(() => {
    setAllRooms();
  }, []);

  const handleSelectRoom = (id) => {
    setActiveRoomId(id);
    setActiveInventoryId(null);
  }

  return (
    <BaseCard
      title="Rooms"
      titleAppend={
        <BaseButton
          className="ml-auto"
          type="secondary"
          size="xs"
          onClick={() => setCreateRoomVisible(true)}>Add</BaseButton>
      }>
      { loadingRooms && <BaseListSkeleton /> }
      { !loadingRooms &&
        <nav className="-mx-3">
          <ul>
            {rooms.map(({ id, name }) => (
              <li
                key={id}
                className={`border-b border-gray-100 px-2 py  ${activeRoomId !== id && 'hover:bg-slate-50' } ${activeRoomId === id && 'bg-blue-100'} `}
                onClick={ () => handleSelectRoom(id) }>
                <BaseMediaItem title={name} link={{ href: "#", text: name }} />
              </li>
            ))}
          </ul>
        </nav>
      }
      </BaseCard>
  );
}
