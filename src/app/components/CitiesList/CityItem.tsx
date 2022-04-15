import { useAppDispatch } from "../../hooks/redux";
import { ICity } from "../../interfaces/Options";
import { optionsActions } from "../../store/reducers/OptionsSlice";

interface Props {
  city: ICity;
  isSelected: boolean;
}
export default function CityItem({ city, isSelected }: Props) {
  const { selectCity, deleteCity } = optionsActions;
  const dispatch = useAppDispatch();

  const handleSelect = (city: ICity) => {
    dispatch(selectCity(city));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteCity(id));
  };

  return (
    <li className={`list-item ${isSelected ? "is-selected" : ""}`}>
      <p onClick={() => handleSelect(city)}>{city.name}</p>
      <div className="list-delete" onClick={() => handleDelete(city.id)}>
        <img src="icons/delete.svg" alt="delete" />
      </div>
    </li>
  );
}
