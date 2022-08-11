import BaseModal from "../components/BaseModal";
import BaseInput from "../components/BaseInput";
import roomRepository from "../services/roomRepository";
import { useStore } from "../store";
import { useState } from "react";
import useInput from "../hooks/useInput";

import { trimSpaces, validateInput } from '../utils';

export default function CreateRoomModal() {
  const rooms = useStore((state) => Object.values(state.rooms));
  const visible = useStore((state) => state.createRoomVisible);
  const setCreateRoomVisible = useStore((state) => state.setCreateRoomVisible);
  const addRoom = useStore((state) => state.addRoom);
  const [busy, setBusy] = useState(false);

  const [input, setInput] = useInput();

  const handleCancel = () => setCreateRoomVisible(false);

  const handleConfirm = async () => {
    setBusy(true);
    const room = await roomRepository.add(input.value);
    const data = await room.json();
    addRoom(data);
    setBusy(false);
    setCreateRoomVisible(false);
    setInput({
      name: '',
      error: '',
    })
  }


  return (
    <BaseModal
      visible={visible}
      title={"Create new Room"}
      confirmDisabled={Boolean(input.error) || trimSpaces(input.value) === ''}
      busy={busy}
      onCancel={handleCancel}
      onConfirm={handleConfirm}>
      <BaseInput
        value={input.value}
        error={input.error}
        placeholder="Room name"
        onChange={(value) => setInput(validateInput(value, rooms.map(r => r.name)))} />
    </BaseModal>
  );
}
