export interface ICity {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
}

export interface IOptions {
  citiesList: ICity[];
  currentCity: ICity | null;
  currentLocation: ICity;
  lang: string;
  units: string;
  loading: boolean;
  error: boolean;
  activeForecast: "hourly" | "daily";
}
