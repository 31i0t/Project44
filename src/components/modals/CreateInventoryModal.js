import { trimSpaces } from '../../utils';
import { useStore } from "../../store";
import { validateInput } from "../../utils";

import BaseInput from "../base/BaseInput";
import BaseModal from "../base/BaseModal";
import useActiveRoom from "../../hooks/useActiveRoom";
import useInput from "../../hooks/useInput";

export default function CreateRoomModal(props) {
  const { onCancel = () => '', onConfirm = () => '' } = props;
  const pushInventory = useStore((state) => state.pushInventory);
  const activeRoom = useActiveRoom();
  const [input, setInput] = useInput();

  const handleCancel = () => onCancel();

  const handleConfirm = async () => {
    await toast.promise(
      pushInventory(input.value),
      {
        loading: 'Creating asset...',
        success: <b>Asset created succesfully!</b>,
        error: <b>There was an error trying to create this asset, please try again.</b>,
      }
    );
    setInput({ value: '', error: ''});
    onConfirm();
  }

  const handleInputChange = (evt) => setInput(validateInput(evt.target.value, inventory.map(i => i.name)))

  const { inventory = [] } = activeRoom || {};

  return (
    <BaseModal
      title={"Create new item"}
      visible={true}
      confirmDisabled={Boolean(input.error) || trimSpaces(input.value) === ''}
      onCancel={handleCancel}
      onConfirm={handleConfirm}>
      <BaseInput
        value={input.value}
        error={input.error}
        placeholder="Asset name"
        onChange={handleInputChange} />
    </BaseModal>
  );
}
