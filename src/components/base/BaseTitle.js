export default function BaseTitle(props) {
  const {
    size = 'default',
    dashed = false,
    className = '',
    children,
    onClick = () => '',
  } = props;
  const tagBySize = {
    default: 'h4',
    main: 'h2',
    large: 'h3',
    small: 'h4',
  }
  const Tag = tagBySize[size];

  let titleClass = '';
  let containerClass = className;

  if (size === 'main') {
    titleClass += 'font-bold text-gray-600 uppercase';
    containerClass += `py-3 ${dashed ? ' border-b' : ''}`;
  }

  if (size === 'large') {
    titleClass += 'text-xl text-gray-600 capitalize';
    containerClass += `py-3 ${dashed ? ' border-b' : ''}`;
  }

  if (size === 'default') {
    titleClass += 'text-base text-gray-600 capitalize';
    containerClass += `py-3 ${dashed ? ' border-b' : ''}`;
  }

  if (size === 'small') {
    titleClass += 'text-sm text-gray-500 capitalize';
    containerClass += `py-2 ${dashed ? ' border-b' : ''}`;
  }

  return (
    <div className={containerClass} onClick={onClick}>
      <Tag className={titleClass}>{children}</Tag>
    </div>
  );
}
