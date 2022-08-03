import BaseButton from './BaseButton';

export default function BaseModal({
  visible, onCancel, onConfirm, children, cancel = "Cancel", confirm = 'Confirm',title
}) {
  if (!visible) return;

  return (
    <div className="fixed w-full left-0 top-0 h-full flex items-center justify-center z-50">
      <div className="bg-black opacity-30 absolute top-0 left-0 right-0 bottom-0"></div>
      <div className="bg-white rounded shadow-md p-5 w-1/3 relative">
        { title && (
          <div className="py-5 -mt-5 font-bold">
          {title}
          </div>
        )}
        <div>
          {children}
        </div>
        <div className="flex py-5 -mb-5 justify-end gap-2">
          { onCancel && (
            <BaseButton type="secondary" onClick={onCancel}>
              { cancel }
            </BaseButton>
          )}
          { onConfirm && (
            <BaseButton type="primary" onClick={onConfirm}>
              { confirm }
            </BaseButton>
          )}
        </div>
      </div>
    </div>
  );
}
