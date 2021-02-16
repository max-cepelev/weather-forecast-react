import React from 'react';
import './CitiesList.css';

const CitiesList = ({cities, currentCity}) => {
    return (
        <ul className='list'>
            {cities.map(city => {
                
                return (
                    <li
                        key={city.id}
                        className={`list-item ${currentCity.name === city.name ? 'is-selected' : ''}`}>
                            {city.name}
                    </li>);
            })}
        </ul>
    );
}

export default CitiesList;