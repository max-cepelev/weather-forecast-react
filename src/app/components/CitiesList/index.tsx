import "./list.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import CityItem from "./CityItem";
import { optionsActions } from "../../store/reducers/OptionsSlice";
import { useMemo } from "react";

export default function CitiesList() {
  const { citiesList, currentCity, currentLocation } = useAppSelector(
    (store) => store.optionsReducer
  );
  const { resetCity } = optionsActions;
  const dispatch = useAppDispatch();

  return (
    <ul className="list flexfont24">
      <li
        onClick={() => dispatch(resetCity())}
        className={`list-location ${currentCity ? "" : "is-selected"}`}
      >
        {currentLocation ? currentLocation.name : "Не определен"}
      </li>
      {citiesList.map((city) => {
        return (
          <CityItem
            key={city.id}
            isSelected={currentCity ? currentCity.id === city.id : false}
            city={city}
          />
        );
      })}
    </ul>
  );
}
