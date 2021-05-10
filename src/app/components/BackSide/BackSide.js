import React from 'react';
import CitiesList from '../CitiesList';
import CitySearch from '../CitySearch';
import './button.css';



const BackSide = ({onClick, citiesList, currentCity, onSelect, onClickLang, onAddCity, getLocalStorage, onDelete}) => {
    
    return (
        <div className='card-back'>
            <div>
                {/* <button className='button-lang' onClick={onClickLang}>lang</button> */}
                <CitiesList
                    citiesList={citiesList}
                    currentCity={currentCity}
                    onSelect={onSelect}
                    getLocalStorage={getLocalStorage}
                    onDelete={onDelete}
                />
                <CitySearch addCity={onAddCity}/>
            </div>
            <button className='button' onClick={onClick} >Назад</button>
        </div>
    );
};

export default BackSide;