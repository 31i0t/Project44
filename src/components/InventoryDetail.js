/**
 * Handles the logic to view and edit inventory
 */

import { useState } from "react";
import { useStore } from "../store";

import useActiveInventory from '../hooks/useActiveInventory';
import { useUpdateInventory } from "../hooks/useInventoryRepository";

import BaseButton from "./base/BaseButton";
import BaseContent from "./base/BaseContent";
import BaseEditableInput from "./base/BaseEditableInput";
import BaseInput from "./base/BaseInput";
import BaseTitle from "./base/BaseTitle";
import DeletInventoryModal from "./modals/DeleteInventoryModal";

export default function InventoryDetail() {
    const activeInventory = useActiveInventory();
    const updateInventory = useUpdateInventory();

    const activeRoomId = useStore(state => state.activeRoomId);
    const inventory = useStore(state => Object.values(state.inventory));
    const setActiveInventoryId = useStore(state => state.setActiveInventoryId);

    const [showDeleteInventoryModal, setShowDeleteInventoryModal] = useState(false);

    const handleChange = (prop, value) => {
        updateInventory(activeInventory.id, {
            [prop]: value,
        });
    };

    // get inventory names of current room and avoid current asset
    const inventoryNames = inventory
        .filter(({id, roomId}) => roomId === activeRoomId && id !== activeInventory.id)
        .map(i => i.name);

    return (
        <div className="px-3 border-l h-full flex flex-col relative">
            {/* Close Button */}
            <div className="close-button" onClick={() => setActiveInventoryId()} />
            {/* Detail */}
            <div className="py-2 flex-grow">
                {/* Name */}
                <BaseEditableInput
                    validationValues={inventoryNames}
                    content={<BaseTitle size="large">{activeInventory.name}</BaseTitle>}
                    input={<BaseInput value={activeInventory.name} />}
                    onChange={(value) => handleChange('name', value)}
                />
                {/* Description */}
                <BaseTitle>Description</BaseTitle>
                <BaseEditableInput
                    input={
                        <textarea className="w-full border h-40 p-3" multiline="true" value={activeInventory.description} />
                    }
                    content={<BaseContent>Edit</BaseContent>}
                    onChange={(value) => handleChange('description', value)}
                />
            </div>
            {/* Footer */}
            <div className="">
                {/* Delete */}
                <BaseButton type="danger-blank" size="sm" onClick={() => setShowDeleteInventoryModal(true)}>Delete item</BaseButton>
                {/* Add */}
                { showDeleteInventoryModal && <DeletInventoryModal onCancel={() => setShowDeleteInventoryModal(false)} onConfirm={() => setShowDeleteInventoryModal(false)} /> }
            </div>
        </div>
    );
}
