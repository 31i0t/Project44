import { useState } from "react";
import { trimSpaces } from "../../utils";
import { useStore } from "../../store";
import { validateInput } from "../../utils";

import BaseInput from "../base/BaseInput";
import BaseModal from "../base/BaseModal";
import useInput from "../../hooks/useInput";

import { useAddInventory } from "../../hooks/useInventoryRepository";

export default function CreateRoomModal(props) {
  const { onCancel = () => '', onConfirm = () => '' } = props;
  const activeRoomId = useStore(state => state.activeRoomId);
  const inventory = useStore(state => Object.values(state.inventory));
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useInput();
  const addInventory = useAddInventory();

  const handleConfirm = async () => {
    setBusy(true);
    await addInventory(input.value);
    setInput({ value: '', error: ''});
    onConfirm();
  };

  // check that name is not repeated among room inventory
  const handleInputChange = (evt) => setInput(validateInput(
    evt.target.value,
    inventory.filter(({roomId}) => roomId === activeRoomId).map(i => i.name),
  ));

  const handleInputKeyDown = (evt) => {
    if (!busy && evt.keyCode === 13 && !Boolean(input.error) && trimSpaces(input.value) !== '') {
      handleConfirm();
    }
  }

  return (
    <BaseModal
      title={"Create new item"}
      visible={true}
      confirmDisabled={Boolean(input.error) || trimSpaces(input.value) === ''}
      onCancel={onCancel}
      onConfirm={handleConfirm}>
      <BaseInput
        autoFocus={true}
        value={input.value}
        error={input.error}
        placeholder="Asset name"
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown} />
    </BaseModal>
  );
}
