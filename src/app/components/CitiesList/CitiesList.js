import './list.scss';
import CityItem from './CityItem';

export default function CitiesList({options, onSelectCity, onDeleteCity}) {

    const {currentCity, citiesList, currentLocation} = options;

    // сортировка по алфавиту
    // sort alphabetically
    citiesList.sort(function(a, b) {
        let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
        if (nameA < nameB) //сортируем строки по возрастанию/ sort lines in ascending order
            return -1
        if (nameA > nameB)
            return 1
        return 0 // Никакой сортировки/ No sorting
        })

    return (
        <ul className='list flexfont24'>
            <li onClick={() => onSelectCity(null)} className={`list-location ${currentCity ? "" : "is-selected"}`}>
                {currentLocation ? currentLocation.name : "Не определен"}
            </li>
            {citiesList.map(city => {
                return (
                    <CityItem 
                        key={city.id}
                        isSelected={currentCity ? currentCity.id === city.id : false} 
                        city={city}
                        onSelectCity={onSelectCity}
                        onDeleteCity={onDeleteCity}
                    />
                );
            })}
        </ul>
    );
}