import { useState } from "react";
import { useStore } from "../store";
import { useDeleteRoom } from "../hooks/useRoomRepository";

import BaseButton from "./base/BaseButton";
import BaseCard from "./base/BaseCard";
import BaseEditableInput from "./base/BaseEditableInput";
import BaseInput from "./base/BaseInput";
import BaseListSkeleton from "./base/BaseListSkeleton";
import BaseModal from "./base/BaseModal";
import BaseTitle from "./base/BaseTitle";
import InventoryDetail from "./InventoryDetail";
import InventoryList from "./InventoryList";
import useActiveRoom from "../hooks/useActiveRoom";


export default function RoomInventory() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [showCreateInventoryModal, setShowCreateInventoryModal] = useState(false);
  const activeInventoryId = useStore((state) => state.activeInventoryId);
  // const deleteRoom = useDeleteRoom();
  const activeRoom = useActiveRoom();
  const loadingRooms = useStore((state) => state.loadingRooms);
  const rooms = useStore((state) => Object.values(state.rooms));
  const updateItem = useStore((state) => state.updateItem);

  const handleAddItem = () => setShowCreateInventoryModal(true);

  const handleChangeRoomName = (name) => {
    updateItem('room', activeRoom.id, {
      name,
    });
  }

  const handleDelete = async () => {
    setShowDeleteModal(true);
    const confirm = await new Promise((resolve) => {
      ({
        cancelDelete: () => resolve(false),
        confirmDelete: () => resolve(true),
      });
    });
    debugger
    if (await confirm) {
      // await deleteRoom(activeRoom.id)
    }
    setShowDeleteModal(false);
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
          !loadingRooms && rooms.length > 0 && !activeRoom.id && <p className="text-center">Please select a room from the left menu.</p>
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
    <BaseModal
      visible={showDeleteModal}
      title={`Are you sure you want to delete ${activeRoom.name}?`}
      onCancel={() => deleteHandlers.cancelDelete()}
      onConfirm={() => deleteHandlers.confirmDelete()}>
        This action cannot be reverted, all assets in this room will be lost.
      </BaseModal>
  </BaseCard>
}
