import React from "react";
import { ISearchCityData } from "../../interfaces/Cities";

interface Props {
  city: ISearchCityData;
  onClick: () => void;
}

const CitySearchResult = ({ city, onClick }: Props) => {
  const name = city.local_names ? city.local_names.ru : city.name;
  return (
    <li className="search-item" onClick={onClick}>
      <img src="icons/add.svg" alt="add" />
      <p>{name}</p>
    </li>
  );
};

export default CitySearchResult;
