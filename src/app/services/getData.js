
const getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};

const keyAPI = "baa2d1fa83b6825df322b2b340a72fb9";

const getWeather = async (lat, lon, currentLang, units) => {
    const res = await getResource(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${keyAPI}&lang=${currentLang}&units=${units}`);
    return res;
}
const getCity = async (cityName) => {
    const res = await getResource(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${keyAPI}`);
    return res;
}
const getCityName = async (lat, lon) => {
    const res = await getResource(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${keyAPI}`);
    return res;
}

export {getWeather, getCity, getCityName};