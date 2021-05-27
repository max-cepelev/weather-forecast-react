import React from 'react';

const CitySearchResult = ({city, onClick}) => {
    const name = city.local_names.ru || city.name;
    return (
        <li className="search-item"
            onClick={onClick}>
            <img src="icons/add.svg" alt="add" />
            <p>{name}</p>
        </li>
    )
}

export default CitySearchResult;