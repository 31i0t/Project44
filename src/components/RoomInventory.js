/**
 * Handles the logic to view and edit room data
 */

import { useState } from "react";
import { useStore } from "../store";

import useActiveRoom from "../hooks/useActiveRoom";
import { useUpdateRoom } from "../hooks/useRoomRepository";

import BaseButton from "./base/BaseButton";
import BaseCard from "./base/BaseCard";
import BaseEditableInput from "./base/BaseEditableInput";
import BaseInput from "./base/BaseInput";
import BaseListSkeleton from "./base/BaseListSkeleton";
import BaseTitle from "./base/BaseTitle";
import CreateInventoryModal from "./modals/CreateInventoryModal";
import DeleteRoomModal from "./modals/DeleteRoomModal";
import InventoryDetail from "./InventoryDetail";
import InventoryList from "./InventoryList";

export default function RoomInventory() {
  const activeRoom = useActiveRoom();
  const updateRoom = useUpdateRoom();

  const activeInventoryId = useStore((state) => state.activeInventoryId);
  const loadingRooms = useStore((state) => state.loadingRooms);
  const rooms = useStore((state) => Object.values(state.rooms));

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateInventoryModal, setShowCreateInventoryModal] =
    useState(false);

  const handleAddItem = () => setShowCreateInventoryModal(true);

  const handleChangeRoomName = (name) => {
    updateRoom(activeRoom.id, {
      name,
    });
  };

  const handleDelete = async () => {
    setShowDeleteModal(true);
  };

  // get roomNames except current room
  const roomNames = rooms
    .filter(({ id }) => id !== activeRoom.id)
    .map((r) => r.name);

  return (
    <BaseCard title="Inventory" className="h-full">
      <div className="flex h-full -mx-3">
        {/* Room data */}
        <div
          className={`relative flex flex-col ${
            activeInventoryId ? "w-1/2" : "w-full"
          }`}
        >
          {/* Loading indicator */}
          {loadingRooms && (
            <div className="p-3">
              <BaseListSkeleton />
            </div>
          )}
          {/* Show message if no rooms have been created yet */}
          {!loadingRooms && rooms.length === 0 && (
            <p className="text-center">
              You haven&apos;t created any rooms yet.
            </p>
          )}
          {/* Show message if no room selected */}
          {!loadingRooms && rooms.length > 0 && !activeRoom.id && (
            <p className="text-center">
              Please select a room from the left menu.
            </p>
          )}
          {/* Show room detail */}
          {!loadingRooms && activeRoom.id && (
            <>
              {/* Name */}
              <div className="px-3">
                <BaseEditableInput
                  validationValues={roomNames}
                  content={
                    <BaseTitle size="large">{activeRoom.name}</BaseTitle>
                  }
                  input={<BaseInput value={activeRoom.name} className="mb-3" />}
                  onChange={handleChangeRoomName}
                />
              </div>

              {/* Inventory list */}
              <InventoryList className="flex-grow" />

              {/* Footer */}
              <div className="flex border-t p-3 pb-0 bg-white gap-2">
                {/* Delete */}
                <BaseButton
                  type="danger-blank"
                  size="sm"
                  onClick={handleDelete}
                >
                  Delete room
                </BaseButton>
                {/* Add */}
                <BaseButton
                  className="ml-auto"
                  type="secondary"
                  size="sm"
                  onClick={handleAddItem}
                >
                  Add asset
                </BaseButton>
              </div>
            </>
          )}
        </div>
        {/* Inventory detail */}
        {activeInventoryId && (
          <div className="w-1/2 h-full">
            <InventoryDetail />
          </div>
        )}
      </div>
      {/* Modals */}
      {showDeleteModal && (
        <DeleteRoomModal
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={() => setShowDeleteModal(false)}
        />
      )}
      {showCreateInventoryModal && (
        <CreateInventoryModal
          onCancel={() => setShowCreateInventoryModal(false)}
          onConfirm={() => setShowCreateInventoryModal(false)}
        />
      )}
    </BaseCard>
  );
}
