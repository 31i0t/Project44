import BaseButton from './BaseButton';
import { Portal } from 'react-portal';

export default function BaseModal(props) {
  const {
    visible,
    onCancel,
    onConfirm,
    children,
    cancel = "Cancel",
    confirm = 'Confirm',
    title,
    confirmDisabled,
    busy,
  } = props;

  if (!visible) return;

  return (
    <Portal>
      <div className="fixed w-full left-0 top-0 h-full flex items-center justify-center z-50">
        <div className="bg-black opacity-30 absolute top-0 left-0 right-0 bottom-0"></div>
        <div className="bg-white rounded shadow-md p-5 w-1/3 relative">
          { busy &&
            <div className="absolute top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center bg-white bg-opacity-50">
              <div className="loader"></div>
            </div>
          }
          { title &&
            <div className="py-5 -mt-5 font-bold">
            {title}
            </div>
          }
          <div>
            {children}
          </div>
          <div className="flex py-5 -mb-5 justify-end gap-2">
            { onCancel &&
              <BaseButton type="blank" onClick={onCancel}>
                { cancel }
              </BaseButton>
            }
            { onConfirm &&
              <BaseButton disabled={confirmDisabled} type="primary" onClick={onConfirm}>
                <div className="flex">
                  { confirm }
                </div>
              </BaseButton>
            }
          </div>
        </div>
      </div>
    </Portal>
  );
}
