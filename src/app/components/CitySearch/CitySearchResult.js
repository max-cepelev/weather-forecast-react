import React from 'react';

const CitySearchResult = ({city, addCity}) => {
    return (
        <li className="search-item"
            onClick={addCity}>
            {city.local_names.ru}
        </li>
    )
}

export default CitySearchResult;