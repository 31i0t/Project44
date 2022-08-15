import { useEffect, useState, useRef } from "react";
import { useStore } from "../store";
import roomRepository from "../services/roomRepository";

import BaseCard from "./base/BaseCard";
import BaseButton from "./base/BaseButton";
import BaseListSkeleton from "./base/BaseListSkeleton";
import InventoryList from "./InventoryList";
import InventoryDetail from "./InventoryDetail";
import BaseTitle from "./base/BaseTitle";
import useActiveRoom from "../hooks/useActiveRoom";
import BaseInput from "./base/BaseInput";
import BaseEditableInput from "./base/BaseEditableInput";

export default function RoomInventory() {
  const activeRoom = useActiveRoom();
  const activeInventoryId = useStore((state) => state.activeInventoryId);
  const loadingRooms = useStore((state) => state.loadingRooms);
  const rooms = useStore((state) => Object.values(state.rooms));
  const setCreateInventoryVisible = useStore((state) => state.setCreateInventoryVisible);
  const updateItem = useStore((state) => state.updateItem);

  const handleDelete = () => roomRepository.delete(activeRoom.id);
  const handleAddItem = () => setCreateInventoryVisible(true);

  const handleChangeRoomName = (name) => {
    updateItem('room', activeRoom.id, {
      name,
    });
  }

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
          !loadingRooms && activeRoom.id && (
            <>
              <div className="px-3">
                <BaseEditableInput
                  content={<BaseTitle size="large">{activeRoom.name}</BaseTitle>}
                  input={<BaseInput value={activeRoom.name} className="mb-3" />}
                  onChange={handleChangeRoomName}
                />
              </div>

              <InventoryList className="flex-grow" />

              <div className="flex absolute border-t p-3 left-0 right-0 -bottom-3 bg-white gap-2">
                <BaseButton type="danger-blank" size="sm" onClick={handleDelete}>Delete room</BaseButton>
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
