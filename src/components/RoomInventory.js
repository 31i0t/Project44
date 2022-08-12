import { useEffect, useState, useRef } from "react";
import { useStore } from "../store";
import roomRepository from "../services/roomRepository";
import { validateInput, trimSpaces } from "../utils";

import BaseCard from "./base/BaseCard";
import BaseButton from "./base/BaseButton";
import BaseListSkeleton from "./base/BaseListSkeleton";
import InventoryList from "./InventoryList";
import InventoryDetail from "./InventoryDetail";
import BaseTitle from "./base/BaseTitle";
import useActiveRoom from "../hooks/useActiveRoom";
import BaseInput from "./base/BaseInput";
import useInput from "../hooks/useInput";
import useClickOutside from "../hooks/useClickOutside";
import BaseIcon from "./base/BaseIcon";
import BaseHover from "./base/BaseHover";

export default function RoomInventory() {
  const [input, setInput] = useInput();
  const activeRoomId = useStore((state) => state.activeRoomId);;
  const activeRoom = useActiveRoom();
  const activeInventoryId = useStore((state) => state.activeInventoryId);
  const loadingRooms = useStore((state) => state.loadingRooms);
  const rooms = useStore((state) => Object.values(state.rooms));
  const setCreateInventoryVisible = useStore((state) => state.setCreateInventoryVisible);
  const updateRoom = useStore((state) => state.updateRoom);

  const handleDelete = () => roomRepository.delete(activeRoom.id);
  const handleAddItem = () => setCreateInventoryVisible(true);

  const [editRoomName, setEditRoomName] = useState(false);

  const roomNameRef = useRef(null);

  useClickOutside(roomNameRef, () => {
    setEditRoomName(false);
  });

  useEffect(() => {
    if (activeRoom.name) {
      setInput({ value: activeRoom.name, error: '' });
    }
  }, [activeRoom])

  useEffect(() => {
    if (!editRoomName && !input.error) {
      updateRoom(activeRoom.id, {
        name: input.value,
      })
    }
  }, [editRoomName])

  return <BaseCard title="Inventory" className="h-full">
    <div className="flex h-full -mx-3">
      <div className={`relative flex flex-col ${activeInventoryId ? 'w-1/2' : 'w-full'}`}>
        {
          loadingRooms && <div className="p-3"><BaseListSkeleton /></div>
        }
        {
          !loadingRooms && rooms.length === 0 && <p className="text-center">You haven&apos;t created any rooms yet.</p>
        }
        {
          !loadingRooms && activeRoom && (
            <>
              <div className="border-b flex items-center px-3">
                <div className="flex gap-2 items-center">

                  { !editRoomName &&
                    <BaseHover className="flex items-center gap-2 cursor-pointer" onClick={() => setEditRoomName(true)}>
                      <BaseTitle label={activeRoom.name} /><BaseIcon name="edit" />
                    </BaseHover>
                  }
                  { editRoomName &&
                    <div ref={roomNameRef} className="pb-3">
                      <BaseInput
                        value={input.value}
                        error={input.error}
                        onChange={(value) => setInput(validateInput(value, rooms.filter(r => r.id !== activeRoom.id).map(r => r.name)))} />
                    </div>
                  }
                </div>
              </div>

              <InventoryList className="flex-grow" />

              <div className="flex absolute border-t p-3 left-0 right-0 -bottom-3 bg-white gap-2">
                <BaseButton type="danger-blank" size="xs" onClick={handleDelete}>Delete room</BaseButton>
                <BaseButton className="ml-auto" type="secondary" size="sm" onClick={handleAddItem}>Add Item</BaseButton>
              </div>
            </>
          )
        }
      </div>
      { activeInventoryId && <div className="w-1/2 h-full"><InventoryDetail/></div> }
    </div>
  </BaseCard>
}
