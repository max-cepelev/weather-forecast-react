import React from 'react';

const CitySearchResult = ({city, onClick}) => {
    return (
        <li className="search-item"
            onClick={onClick}>
            {city.local_names.ru}
        </li>
    )
}

export default CitySearchResult;