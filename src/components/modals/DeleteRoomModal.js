import { useState } from 'react';
import BaseModal from "../base/BaseModal";
import useActiveRoom from "../../hooks/useActiveRoom";
import { useDeleteRoom } from '../../hooks/useRoomRepository';

export default function CreateRoomModal(props) {
  const { onCancel = () => '', onConfirm = () => '' } = props;
  const room = useActiveRoom();
  const [busy, setBusy] = useState(false);
  const deleteRoom = useDeleteRoom();

  const handleConfirm = async () => {
    setBusy(true);
    await deleteRoom(room.id);
    onConfirm();
  };

  return (
    <BaseModal
      title={`Are you sure you want to delete "${room.name}"`}
      visible={true}
      busy={busy}
      onCancel={onCancel}
      onConfirm={handleConfirm}>
      This operation cannot be undone.
    </BaseModal>
  );
}
