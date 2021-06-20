export default function CityItem({city, isSelected, onDeleteCity, onSelectCity}) {
    return (
        <li
            key={city.id}
            className={`list-item ${isSelected ? 'is-selected' : ''}`}>
                <p onClick={() => onSelectCity(city)}>{city.name}</p>
                <div className="list-delete" onClick={() => onDeleteCity(city.id)}><img src="icons/delete.svg" alt="delete"/></div>
        </li>
    )
}