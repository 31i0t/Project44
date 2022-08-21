import { useState } from 'react';
import { trimSpaces, validateInput } from '../../utils';
import { useStore } from "../../store";
import BaseInput from "../base/BaseInput";
import BaseModal from "../base/BaseModal";
import useInput from "../../hooks/useInput";
import { useAddRoom } from "../../hooks/useRoomRepository";

export default function CreateRoomModal(props) {
  const { onCancel = () => '', onConfirm = () => '' } = props;
  const rooms = useStore((state) => Object.values(state.rooms));
  const [input, setInput] = useInput();
  const [busy, setBusy] = useState(false);
  const addRoom = useAddRoom();

  const handleConfirm = async () => {
    setBusy(true);
    await addRoom(input.value);
    setInput({ value: '', error: ''});
    onConfirm();
  };

  const handleInputChange = (evt) => setInput(validateInput(evt.target.value, rooms.map(r => r.name)));

  const handleInputKeyDown = (evt) => {
    if (!busy && evt.keyCode === 13 && !Boolean(input.error) && trimSpaces(input.value) !== '') {
      handleConfirm();
    }
  }

  return (
    <BaseModal
      title={"Create new Room"}
      visible={true}
      busy={busy}
      confirmDisabled={Boolean(input.error) || trimSpaces(input.value) === ''}
      onCancel={onCancel}
      onConfirm={handleConfirm}>
      <BaseInput
        autoFocus
        value={input.value}
        error={input.error}
        placeholder="Room name"
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown} />
    </BaseModal>
  );
}
