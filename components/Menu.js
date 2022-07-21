import MediaItem from "./MediaItem";

export default function Menu({items}) {
    const listItems = items.map((item, index) => (
        <li key={index+item.id} className="bg-white border-b border-gray-100 px-2 py">
            <MediaItem title={item.name} link={{ href:"#", text: item.name }} />     
        </li>
    ));

    return (
        <nav>
            <ul>
                { listItems }
            </ul>
        </nav>
    );
}