import React from 'react';
import './list.scss';
import CityItem from './CityItem';

const CitiesList = ({citiesList, currentCity, onSelect, getLocalStorage, onDelete}) => {
    const onClick = () => {
        onSelect(getLocalStorage('currentLocation', {}));
        localStorage.removeItem('currentCity');
    }
    // сортировка по алфавиту
    citiesList.sort(function(a, b) {
        let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
        if (nameA < nameB) //сортируем строки по возрастанию
            return -1
        if (nameA > nameB)
            return 1
        return 0 // Никакой сортировки
        })
    return (
        <ul className='list flexfont24'>
            <li
                onClick={onClick}
                className={`list-item ${currentCity.id === getLocalStorage("currentLocation", {}).id ? 'is-selected' : ''}`}>Текущее местоположение
            </li>
            {citiesList.map(city => {
                return (
                    <CityItem 
                        key={city.id}
                        isSelected={currentCity.id === city.id} 
                        city={city}
                        onSelect={onSelect}
                        onDelete={() => onDelete(city.id, citiesList)}
                    />
                );
            })}
        </ul>
    );
}

export default CitiesList;