import { useState } from "react";
import { useStore } from "../store";

import BaseMediaItem from "./base/BaseMediaItem";
import BaseCard from "./base/BaseCard";
import BaseButton from "./base/BaseButton";
import BaseListSkeleton from "./base/BaseListSkeleton";
import CreateRoomModal from "./modals/CreateRoomModal";

export default function RoomList() {
  const activeRoomId = useStore((state) => state.activeRoomId);
  const loadingRooms = useStore((state) => state.loadingRooms);
  const rooms = useStore((state) => Object.values(state.rooms));
  const setActiveRoomId = useStore((state) => state.setActiveRoomId);

  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);

  const handleSelectRoom = (id) => {
    setActiveRoomId(id);
  }

  return <BaseCard
    className="flex-grow"
    title="Rooms"
    titleAppend={
      rooms.length > 0 && <BaseButton
        className="ml-auto"
        type="secondary"
        size="xs"
        onClick={() => setShowCreateRoomModal(true)}>+</BaseButton>
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
    {
      !loadingRooms && rooms.length === 0 &&
      <BaseButton
        className="w-full"
        type="secondary"
        size="sm"
        onClick={() => setShowCreateRoomModal(true)}>Create new room</BaseButton>
    }
    { showCreateRoomModal && <CreateRoomModal onCancel={() => setShowCreateRoomModal(false)} onConfirm={() => setShowCreateRoomModal(false)} /> }
  </BaseCard>;
}
