export default function title({ type = 3, add, label, classes = [], dashed = true }) {
    const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    const sizes = ['text-3xl', 'text-2xl', 'text-xl', 'text-xl', 'text-base', 'text-sm'];
    const Tag = tags[type -1];
    const size = sizes[type -1];
    let color = '';
    if (type === 4 || type === 5) {
        color = 'text-gray-500';
    }

    return (
        <div className={`flex ${dashed && 'border-b border-gray-100'} ${color} ${classes.join(' ')}`}>
            <Tag className={`${size} py-2`}>{label}</Tag>
            {add && <button className="ml-auto p-2 hover:bg-gray-100">+</button>}
        </div>
    );
}
