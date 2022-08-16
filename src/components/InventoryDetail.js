import { useStore } from "../store";

import BaseTitle from "./base/BaseTitle";
import BaseInput from "./base/BaseInput";
import BaseButton from "./base/BaseButton";
import useActiveInventory from '../hooks/useActiveInventory';
import BaseEditableInput from "./base/BaseEditableInput";
import BaseContent from "./base/BaseContent";


export default function InventoryDetail() {
    const updateItem = useStore((state) => state.updateItem);
    const activeInventory = useActiveInventory();
    const setActiveInventoryId = useStore((state) => state.setActiveInventoryId);

    const handleChange = (prop, value) => {
        updateItem('inventory', activeInventory.id, {
            [prop]: value,
        });
    };

    return (
        <div className="px-3 border-l h-full flex flex-col relative">
            <div className="close-button" onClick={() => setActiveInventoryId()} />
            <div className="py-2 flex-grow">
                <BaseEditableInput
                    content={<BaseTitle size="large">{activeInventory.name}</BaseTitle>}
                    input={<BaseInput value={activeInventory.name}/>}
                    onChange={(value) => handleChange('name', value)}
                />
                <BaseTitle>Description</BaseTitle>
                <BaseEditableInput
                    input={
                        <textarea className="w-full border h-40 p-3" multiline="true" value={activeInventory.description} />
                    }
                    content={<BaseContent>Click here to edit this field. <br></br>After updating, press enter to submit</BaseContent>}
                    onChange={(value) => handleChange('description', value)}
                />
            </div>
            <div className="">
                <BaseButton type="danger-blank" size="sm">Delete item</BaseButton>
            </div>
        </div>
    );
}
