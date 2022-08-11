import BaseTitle from "./BaseTitle";
import BaseButton from "./BaseButton";
import { useEffect, useState } from "react";
import useActiveInventory from '../hooks/useActiveInventory';
import useDebounce from '../hooks/useDebounce';

export default function InventoryDetail() {
    const activeInventory = useActiveInventory();
    const [localData, setLocalData] = useState({...activeInventory});
    const debouncedData = useDebounce(localData, 500);

    useEffect(() => {
        console.log('changed');
    }, [debouncedData]);

    return (
        <div className="px-3 border-l h-full flex flex-col">
            <BaseTitle label={activeInventory.name} dashed={true} />
            <div className="py-2 flex-grow">
                <BaseTitle label="Description" type="small" dashed={false}/>
                <p>{ activeInventory.description }</p>
                <textarea
                    className="w-full border h-20 p-3"
                    onChange={(e) => setLocalData({ ...localData, description: e.target.value })}
                    value={localData.description} name="body" id="body" />
            </div>
            <div className="">
                <BaseButton type="danger-blank" size="xs">Delete item</BaseButton>
            </div>
        </div>
    );
}
