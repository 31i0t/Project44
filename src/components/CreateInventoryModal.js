import BaseModal from "../components/base/BaseModal";
import BaseInput from "../components/base/BaseInput";
import inventoryRepository from "../services/inventoryRepository";
import { useStore } from "../store";
import { useState } from "react";
import useInput from "../hooks/useInput";
import { trimSpaces } from '../utils';
import useActiveRoom from "../hooks/useActiveRoom";
import { validateInput } from "../utils";

export default function CreateRoomModal() {
  const visible = useStore((state) => state.createInventoryVisible);
  const setCreateInventoryVisible = useStore((state) => state.setCreateInventoryVisible);
  const addInventoryItem = useStore((state) => state.addInventoryItem);
  const activeRoom = useActiveRoom();

  const [busy, setBusy] = useState(false);
  const [input, setInput] = useInput();

  const handleCancel = () => setCreateInventoryVisible(false);

  const handleConfirm = async () => {
    setBusy(true);
    const room = await inventoryRepository.add(activeRoom.id, input.value);
    addInventoryItem(await room.json());
    setBusy(false);
    setCreateInventoryVisible(false);
    setInput()
  }

  const { inventory = [] } = activeRoom || {};

  return (
    <BaseModal
      visible={visible}
      title={"Create new item"}
      confirmDisabled={Boolean(input.error) || trimSpaces(input.value) === ''}
      busy={busy}
      onCancel={handleCancel}
      onConfirm={handleConfirm}>
      <BaseInput
        value={input.value}
        error={input.error}
        placeholder="Asset name"
        onChange={(value) => setInput(validateInput(value, inventory.map(i => i.name)))} />
    </BaseModal>
  );
}
