import React from "react";
import { useAppSelector } from "../../hooks/redux";
import CitiesList from "../CitiesList";
import CitySearch from "../CitySearch";
import "./button.css";

export default function BackSide({ onClick }: { onClick: () => void }) {
  const { citiesList } = useAppSelector((store) => store.optionsReducer);
  return (
    <div className="card-back">
      <div>
        {/* <button className='button-lang' onClick={onClickLang}>lang</button> */}
        <CitiesList />
        {citiesList.length < 10 ? (
          <CitySearch />
        ) : (
          <div className="search-item">Удалите город чтобы добавить новый</div>
        )}
      </div>
      <button className="button" onClick={onClick}>
        Назад
      </button>
    </div>
  );
}
