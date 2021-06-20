import React from 'react';
import CitiesList from '../CitiesList';
import CitySearch from '../CitySearch';
import './button.css';



export default function BackSide({options, onClick, onSelectCity, onAddCity, onDeleteCity}) {
    return (
        <div className='card-back'>
            <div>
                {/* <button className='button-lang' onClick={onClickLang}>lang</button> */}
                <CitiesList
                    options={options}
                    onSelectCity={onSelectCity}
                    onDeleteCity={onDeleteCity}
                />
                {options.citiesList.length < 10 ? <CitySearch addCity={onAddCity}/> : <div className="search-item">Удалите город чтобы добавить новый</div>}
            </div>
            <button className='button' onClick={onClick} >Назад</button>
        </div>
    );
};