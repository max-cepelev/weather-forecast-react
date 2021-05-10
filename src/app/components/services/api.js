
const getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};

const keyAPI = "fcf8724495fdc0ffd44f1c13dde3b8df";

const getWeather = async (lat, lon, currentLang, units) => {
    const res = await getResource(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${keyAPI}&lang=${currentLang}&units=${units}`);
    return res;
}
const getCity = async (cityName) => {
    const res = await getResource(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${keyAPI}`);
    return res;
}
const getLocation = async (currentLang) => {
    const res = await getResource(`http://ip-api.com/json/?lang=${currentLang}&fields=,city,lat,lon`);
    return res;
}



export {getWeather, getCity, getLocation};