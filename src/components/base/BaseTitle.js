export default function BaseTitle(props) {
  const {
    type = 'default',
    label,
    dashed = false,
    className = '',
    onClick = () => '',
  } = props;
  const tagByType = {
    default: 'h4',
    main: 'h3',
    small: 'h5',
  }
  const Tag = tagByType[type];

  let titleClass = '';
  let containerClass = className;

  if (type === 'main') {
    titleClass += 'font-bold text-gray-600 uppercase';
    containerClass += `py-3 ${dashed ? ' border-b' : ''}`;
  }

  if (type === 'default') {
    titleClass += 'text-xl text-gray-600 capitalize';
    containerClass += `py-3 ${dashed ? ' border-b' : ''}`;
  }

  if (type === 'small') {
    titleClass += 'font-bold text-gray-500 capitalize';
    containerClass += `py-2 ${dashed ? ' border-b' : ''}`;
  }

  return (
    <div className={containerClass} onClick={onClick}>
      <Tag className={titleClass}>{label}</Tag>
    </div>
  );
}
