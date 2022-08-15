export default function BaseContent(props) {
  const { children, className = '' } = props;
  return (
    <div className={`${className} whitespace-pre-wrap`}>{children}</div>
  );
}
