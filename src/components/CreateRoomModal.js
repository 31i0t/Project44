import BaseModal from "../components/BaseModal";
import BaseInput from "../components/BaseInput";
import roomRepository from "../services/_roomRepository";
import { useStore } from "../store";
import { useState } from "react";

import { trimSpaces, validateInput } from '../utils';

export default function CreateRoomModal() {
  const rooms = useStore((state) => state.rooms);
  const visible = useStore((state) => state.createRoomVisible);
  const setCreateRoomVisible = useStore((state) => state.setCreateRoomVisible);
  const addRoom = useStore((state) => state.addRoom);
  const [busy, setBusy] = useState(false);

  const [input, setInput] = useState({
    name: '',
    error: '',
  });

  const handleChange = (value) => {
    const result = validateInput(value, rooms.map(r => r.name));
    let error = '';

    if (result === 'no_empty_name_allowed') {
      error = 'No empty name allowed';
    } else if (result === 'name_already_exist') {
      error = 'Name already exist';
    }

    setInput({
      name: value,
      error,
    });
  };

  const handleCancel = () => setCreateRoomVisible(false);

  const handleConfirm = async () => {
    setBusy(true);
    const room = await roomRepository.add(input.name);
    debugger
    addRoom(await room.json());
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
      confirmDisabled={Boolean(input.error) || trimSpaces(input.name) === ''}
      busy={busy}
      onCancel={handleCancel}
      onConfirm={handleConfirm}>
      <BaseInput
        value={input.name}
        error={input.error}
        placeholder="Room name"
        onChange={handleChange} />
    </BaseModal>
  );
}
