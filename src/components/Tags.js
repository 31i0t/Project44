import Pill from "./Pill";

export default function Tags({ items }) {
    const itemsList = items.map((item) => {
        return (
            <li key={item.id}><Pill name={item.name} /></li>
        )
    })
    return (
        <nav>
            <ul className="flex gap-2 p-2 py-4">
                {itemsList}
            </ul>
        </nav>
    );
}