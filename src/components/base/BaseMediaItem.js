const linkDefault = {
    text: 'View details'
};

export default function BaseMediaItem({title, image, link = {}, size = 'default'}) {
    const _link = { ...linkDefault, ...link};
    const itemSize = {
        large: 'py-4',
        default: 'py-2',
    }
    const pictureSize = {
        large: 'w-10 h-10',
        default: 'w-8 h-8',
    }
    return (
        <div className={`relative flex items-center gap-2 ${itemSize[size]}`}>
            { 
                image && 
                <picture className={`relative ${pictureSize[size]} overflow-hidden`}>
                    <img src={image} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" alt={title}/>
                </picture>
            }
            <div className="flex-grow">
                <p>{title}</p>
            </div>
            { 
                _link.href && 
                <a href={ _link.href } className="absolute top-0 left-0 w-full h-full">
                    <span className="sr-only">{ _link.text }</span>
                </a> 
            }
        </div>
    );
}
