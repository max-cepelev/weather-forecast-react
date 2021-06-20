import './panel.scss'
import { useState, useEffect } from 'react'
import { getCityName } from './services/getData'
import FrontSide from './components/FrontSide'
import BackSide from './components/BackSide'


function App() {

	const makeId = () => {
		let ID = "";
		let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		for ( let i = 0; i < 12; i++ ) {
		ID += characters.charAt(Math.floor(Math.random() * 36));
		}
		return ID;
	}

	const [options, setOptions] = useState(JSON.parse(localStorage.getItem("weatherOptions")) || {
			lang: 'ru',
			units: 'metric',
			citiesList: [],
			currentCity: null,
			currentLocation: null
	});

	const [flip, setFlip] = useState(false);

	// Получение текущего местоположения от браузера при монтировании компонента
	// Get the current location from the browser when the component is mounted
	useEffect(() => {
		navigator.geolocation.getCurrentPosition((pos) => {
			const lat = pos.coords.latitude;
			const lon = pos.coords.longitude;
			getCityName(lat, lon)
				.then(res => {
					setOptions(prevOptions => {
						return {
							...prevOptions,
							currentLocation: {
								id: makeId(),
								name: res[0].local_names.ru || res[0].name || "Неопределен",
								lat: res[0].lat,
								lon: res[0].lon
							}
						}
					})
				})
		}, (err) => {
			console.log(err);
			setOptions(prevOptions => {
				if (prevOptions.currentLocation) {
					return {...prevOptions, currentLocation: prevOptions.currentLocation}
				} else {
					return {
						...prevOptions,
						currentLocation: {
							id: makeId(),
							name: "Москва",
							lat: 55.751244,
							lon: 37.618423
						}
					}
				}
			})
		})
	}, [])
	
	// Запись текущего состояния в local storage
	// Write the current state to local storage
	useEffect(() => {
		localStorage.setItem("weatherOptions", JSON.stringify(options));
	}, [options]);

	const onFlip = () => {
		setFlip(!flip)
	}

	const onAddCity = (city) => {
		const {lat, lon, local_names} = city;
		const name = local_names ? local_names.ru : city.name;
		const id = makeId();
		if (!options.citiesList.find(item => item.name === name)) {
			setOptions((prevOptions) => {
				return {
					...prevOptions,
					currentCity: {id, name, lat, lon},
					citiesList: [...prevOptions.citiesList, {id, name, lat, lon}]
				}
			})
		} else {
			return
		}
	}

	const onSelectCity = (city) => {
		setOptions(prevOptions => {
			return {
				...prevOptions,
				currentCity: city,
			}
		})
	}

	const onDelete = (id) => {

		setOptions((prevOptions) => {
			const newCitiesList = prevOptions.citiesList.filter(item => item.id !== id);
			return {...prevOptions, citiesList: newCitiesList};
		})

		if (options.currentCity && options.currentCity.id === id) {
			setOptions(prevOptions => {
				return {
					...prevOptions,
					currentCity: null
				}
			});
		}
	}

	return (
		<div className={`panel ${flip ? 'flip' : ''}`}>
			<div className='panel-front'>
			<FrontSide 
				onClick={onFlip}
				options={options}
			/>
			</div>
			<div className='panel-back'>
				<BackSide
					options={options}
					onClick={onFlip}
					onSelectCity={onSelectCity}
					onDeleteCity={onDelete}
					onAddCity={onAddCity}
				/>
			</div>
		</div>
		);
}

export default App;
