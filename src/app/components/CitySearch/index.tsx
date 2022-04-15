import React, { useState } from "react";
import CitySearchResult from "./CitySearchResult";
import { getCity } from "../../services/getData";
import "./CitySearch.scss";
import { ISearchCityData } from "../../interfaces/Cities";
import { optionsActions } from "../../store/reducers/OptionsSlice";
import { useAppDispatch } from "../../hooks/redux";

const CitySearch = () => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<ISearchCityData[] | null>(null);
  const [error, setError] = useState(false);
  const { addCity } = optionsActions;
  const dispatch = useAppDispatch();

  const onSearch = () => {
    if (value.length >= 2) {
      getCity(value)
        .then((res) => {
          setError(false);
          if (res.length > 0) {
            setResult(res);
          } else {
            setResult(null);
          }
          setValue("");
        })
        .catch(() => {
          setError(true);
        });
    }
  };

  const onClick = (city: ISearchCityData) => {
    dispatch(addCity(city));
    setValue("");
    setResult(null);
  };

  const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="search">
      <div className="search-container">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={onKeyPressHandler}
          type="text"
          placeholder="Поиск города"
          className="search-text"
        />
        <ul className="search-dropdown-menu">
          {result &&
            result.map((city, id) => (
              <CitySearchResult
                key={id}
                city={city}
                onClick={() => onClick(city)}
              />
            ))}
          {result === null && error && (
            <li onClick={() => setResult(null)} className="search-item">
              Не найден
            </li>
          )}
        </ul>
      </div>
      <button onClick={onSearch} type="submit" className="search-button">
        <img src="/icons/search.svg" alt="search" />
      </button>
    </div>
  );
};

export default CitySearch;
