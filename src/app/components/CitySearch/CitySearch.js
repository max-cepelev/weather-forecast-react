import React, {useState} from 'react';
import CitySearchResult from './CitySearchResult';
import {getCity} from '../services/api';
import './CitySearch.scss';


const CitySearch = ({addCity}) => {

    const [value, setValue] = useState("");
    const [result, setResult] = useState([]);

    const onSearch = () => {
        if (value.length > 3) {
            getCity(value)
            .then((res) => {
                console.log(res);
                setResult(res);
                setValue("");
            })
            .catch(() => {
                setResult([{city: "ошибка запроса"}])
            })
        }
    }

    const onClick = (city) => {
        addCity(city);
        setValue("");
        setResult([]);
    }

    return (
        <div className="search">
            <div className="search-container">
                <input value={value} onChange={(e) => setValue(e.target.value)} type="text" placeholder="Поиск города" className="search-text"/>
                <ul  className="search-dropdown-menu">
                    {result.map((city, id) => {
                        return (
                            <CitySearchResult
                            key={id}
                            city={city}
                            onClick={() => onClick(city)}
                            />
                        )
                    })}
                </ul>
            </div>
            <button onClick={onSearch} type="submit" className="search-button"><img src="/icons/search.svg" alt="search"/></button>
        </div>
    );
};

export default CitySearch;