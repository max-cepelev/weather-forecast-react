import React from 'react';
import './list.css';
import CityItem from './CityItem';

const CitiesList = ({citiesList, currentCity, onSelect}) => {
    return (
        <ul className='list'>
            {citiesList.map(city => {
                return (
                    <CityItem 
                        key={city.id}
                        isSelected={currentCity.name === city.name} 
                        city={city}
                        onSelect={onSelect}
                    />
                );
            })}
        </ul>
    );
}

export default CitiesList;