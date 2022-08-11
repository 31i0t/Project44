import BaseTitle from "./BaseTitle";

export default function BaseCard(props) {
  const {
    title,
    titleAppend,
    children,
    className,
    footer
  } = props;
  return (
    <div className={`bg-white border rounded shadow ${className} flex flex-col`}>
        {
          title &&
          <div className="flex items-center p-3 border-b">
            <BaseTitle type="main" label={title} className="-my-3" />
            {titleAppend}
          </div>
        }
        <div className="p-3 flex-grow">
          {children}
        </div>
        {
          footer &&
          <div className="p-3 border-t">
            {footer}
          </div>
        }
    </div>
  );
}
