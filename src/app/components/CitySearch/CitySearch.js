import React, {useState} from 'react';
import CitySearchResult from './CitySearchResult';
import {getCity} from '../services/api';


const CitySearch = ({addCity}) => {

    const [value, setValue] = useState("");
    const [result, setResult] = useState([]);

    const onSearch = () => {
        if (value.length > 3) {
            getCity(value)
            .then((res) => {
                setResult(res);
            })
        }
    }

    return (
        <div className="search">
            <div className="search-container">
                <input onChange={(e) => setValue(e.target.value)} type="text" placeholder="Search city" className="search-text"/>
                <ul  className="search-dropdown-menu">
                    {result.map((city, id) => {
                        return (
                            <CitySearchResult
                            key={id}
                            city={city}
                            addCity={() => addCity(city)}
                            />
                        )
                    })}
                </ul>
            </div>
            <button onClick={onSearch} type="submit" className="button-round dark">Search</button>
        </div>
    );
};

export default CitySearch;