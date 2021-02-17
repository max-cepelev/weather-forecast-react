import React from 'react';
import CitiesList from '../CitiesList';
import './button.css';

const BackSide = ({onClick, cities, currentCity, onSelect}) => {
    return (
        <div className='card-back' >
            <CitiesList
                cities={cities}
                currentCity={currentCity}
                onSelect={onSelect}
            />
            <button className='button' onClick={onClick} >Flip back</button>
        </div>

    );
};

export default BackSide;