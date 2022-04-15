import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISearchCityData } from "../../interfaces/Cities";
import { ICity, IOptions } from "../../interfaces/Options";
import { getCityName } from "../../services/getData";

const makeId = () => {
  let ID = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < 12; i++) {
    ID += characters.charAt(Math.floor(Math.random() * 36));
  }
  return ID;
};

const local = localStorage.getItem("weatherOptions");

const setLocalStorage = (store: IOptions) => {
  localStorage.setItem("weatherOptions", JSON.stringify(store));
};

const initLocation = {
  id: makeId(),
  name: "Москва",
  latitude: 55.751244,
  longitude: 37.618423,
};

const initialState: IOptions = local
  ? JSON.parse(local)
  : {
      citiesList: [],
      currentCity: null,
      currentLocation: initLocation,
      lang: "ru",
      units: "metric",
      loading: true,
      error: false,
      activeForecast: "daily",
    };

export const OptionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    initLocation(
      state,
      action: PayloadAction<{
        name: string;
        latitude: number;
        longitude: number;
      }>
    ) {
      state.currentLocation = {
        id: makeId(),
        name: action.payload.name,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };
      state.loading = false;
      setLocalStorage(state);
    },

    initLocationIsError(state) {
      state.currentLocation = initLocation;
      state.loading = false;
      setLocalStorage(state);
    },

    deleteCity(state, action: PayloadAction<string>) {
      const id = action.payload;
      const newList = [...state.citiesList];
      state.citiesList = newList.filter((item) => item.id !== id);
      if (state.currentCity && state.currentCity.id === id) {
        state.currentCity = null;
      }
      setLocalStorage(state);
    },

    selectCity(state, action: PayloadAction<ICity>) {
      state.currentCity = action.payload;
      setLocalStorage(state);
    },

    resetCity(state) {
      state.currentCity = null;
      setLocalStorage(state);
    },

    addCity(state, action: PayloadAction<ISearchCityData>) {
      const city = action.payload;
      const { lat: latitude, lon: longitude, local_names } = city;
      const name = local_names ? local_names.ru : city.name;
      const id = makeId();
      if (!state.citiesList.some((item) => item.name === name)) {
        const newCity = { id, name, latitude, longitude };
        state.citiesList = [...state.citiesList, newCity].sort(function (a, b) {
          let nameA = a.name.toLowerCase(),
            nameB = b.name.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        state.currentCity = newCity;
      }
      setLocalStorage(state);
    },

    setDaily(state) {
      state.activeForecast = "daily";
      setLocalStorage(state);
    },

    setHourly(state) {
      state.activeForecast = "hourly";
      setLocalStorage(state);
    },
  },
});

export const optionsReducer = OptionsSlice.reducer;

export const optionsActions = OptionsSlice.actions;
