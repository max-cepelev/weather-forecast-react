import React, {useState} from 'react';
import CitySearchResult from './CitySearchResult';
import {getCity} from '../services/api';
import './CitySearch.scss';


const CitySearch = ({addCity}) => {

    const [value, setValue] = useState("");
    const [result, setResult] = useState([]);

    const onSearch = () => {
        if (value.length > 1) {
            getCity(value)
            .then((res) => {
                if (res.length !== 0) {
                    setResult(res);
                } else {
                    setResult(null)
                }
                
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

    const onKeyPressHandler = (event) => {
        if (event.charCode === 13) {
            onSearch();
        }
    }

    const ResultList = (answer) => {
        if (answer !== null) {
            return (
                <ul  className="search-dropdown-menu">
                    {answer.map((city, id) => {
                        return (
                            <CitySearchResult
                            key={id}
                            city={city}
                            onClick={() => onClick(city)}
                            />
                        )
                    })}
                </ul>
            )
        } else {
            return (
                <ul className="search-dropdown-menu">
                    <li onClick={() => setResult([])} className="search-item">Не найден</li>
                </ul>
            )
        }
    }

    return (
        <div className="search">
            <div className="search-container">
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyPress={onKeyPressHandler}
                    type="text" placeholder="Поиск города"
                    className="search-text"/>
                {ResultList(result)}
            </div>
            <button onClick={onSearch} type="submit" className="search-button"><img src="/icons/search.svg" alt="search"/></button>
        </div>
    );
};

export default CitySearch;