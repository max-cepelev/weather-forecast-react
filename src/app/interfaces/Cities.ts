interface ILocaleNames {
  feature_name: string;
  en: string;
  ru: string;
}

export interface ISearchCityData {
  name: string;
  local_names: ILocaleNames;
  lat: number;
  lon: number;
  country: string;
  state: string;
}
