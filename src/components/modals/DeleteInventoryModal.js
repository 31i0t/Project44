import { useState } from 'react';
import BaseModal from "../base/BaseModal";
import { useDeleteInventory } from '../../hooks/useInventoryRepository';
import useActiveInventory from '../../hooks/useActiveInventory';

export default function DeletInventoryModal(props) {
  const { onCancel = () => '', onConfirm = () => '' } = props;
  const inventory = useActiveInventory();
  const [busy, setBusy] = useState(false);
  const deleteInventory = useDeleteInventory();

  const handleConfirm = async () => {
    setBusy(true);
    await deleteInventory(inventory.id);
    onConfirm();
  };

  return (
    <BaseModal
      title={`Are you sure you want to delete "${inventory.name}"`}
      visible={true}
      busy={busy}
      onCancel={onCancel}
      onConfirm={handleConfirm}>
      This operation cannot be undone.
    </BaseModal>
  );
}
