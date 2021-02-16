import React from 'react';
import CitiesList from './CitiesList';

const BackSide = ({onClick, cities, currentCity}) => {
    return (
        <div>
            <CitiesList
                cities={cities}
                currentCity={currentCity}
            />
            <button onClick={onClick} >Flip back</button>
        </div>

    );
};

export default BackSide;