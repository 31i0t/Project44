import { useState } from "react";
import { useStore } from "../store";

import BaseTitle from "./base/BaseTitle";
import BaseInput from "./base/BaseInput";
import BaseButton from "./base/BaseButton";
import useActiveInventory from '../hooks/useActiveInventory';
import BaseEditableInput from "./base/BaseEditableInput";
import BaseContent from "./base/BaseContent";

import { useUpdateInventory } from "../hooks/useInventoryRepository";
import DeletInventoryModal from "./modals/DeleteInventoryModal";
import { validateInput } from "../utils";

export default function InventoryDetail() {
    const activeInventory = useActiveInventory();
    const updateInventory = useUpdateInventory();

    const setActiveInventoryId = useStore(state => state.setActiveInventoryId);
    const activeRoomId = useStore(state => state.activeRoomId);
    const inventory = useStore(state => Object.values(state.inventory));

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
            <div className="close-button" onClick={() => setActiveInventoryId()} />
            <div className="py-2 flex-grow">
                <BaseEditableInput
                    validationValues={inventoryNames}
                    content={<BaseTitle size="large">{activeInventory.name}</BaseTitle>}
                    input={<BaseInput value={activeInventory.name} />}
                    onChange={(value) => handleChange('name', value)}
                />
                <BaseTitle>Description</BaseTitle>
                <BaseEditableInput
                    input={
                        <textarea className="w-full border h-40 p-3" multiline="true" value={activeInventory.description} />
                    }
                    content={<BaseContent>Edit</BaseContent>}
                    onChange={(value) => handleChange('description', value)}
                />
            </div>
            <div className="">
                <BaseButton type="danger-blank" size="sm" onClick={() => setShowDeleteInventoryModal(true)}>Delete item</BaseButton>
                { showDeleteInventoryModal && <DeletInventoryModal onCancel={() => setShowDeleteInventoryModal(false)} onConfirm={() => setShowDeleteInventoryModal(false)} /> }
            </div>
        </div>
    );
}
