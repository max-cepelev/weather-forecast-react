import React from 'react';
import CitiesList from '../CitiesList';
import CitySearch from '../CitySearch';
import './button.css';



const BackSide = ({onClick, citiesList, currentCity, onSelect, onClickLang, onAddCity}) => {
    
    return (
        <div className='card-back' >
            <button className='button-lang' onClick={onClickLang}>lang</button>
            <CitiesList
                citiesList={citiesList}
                currentCity={currentCity}
                onSelect={onSelect}
            />
            <CitySearch addCity={onAddCity}/>
            <button className='button' onClick={onClick} >Flip back</button>
        </div>
    );
};

export default BackSide;