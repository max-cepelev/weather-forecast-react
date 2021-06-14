import { Component } from 'react';
import FrontSide from './components/FrontSide';
import BackSide from './components/BackSide';
import './panel.scss';
import {getLocation} from './components/services/api';

const makeId = () => {
  let ID = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for ( var i = 0; i < 12; i++ ) {
    ID += characters.charAt(Math.floor(Math.random() * 36));
  }
  return ID;
}

const getLocalStorage = (name, ifErrorValue) => {
  let data = JSON.parse(localStorage.getItem(name));
  if (data == null) data = ifErrorValue;
  return data;
}
class App extends Component {

  state = {
    flipped: false,
    currentLang: 'ru',
    currentCity: {},
    citiesList: getLocalStorage("citiesList", [])
  };

  onAddCity = (city) => {
    const {lat, lon, local_names} = city;
    const name = local_names ? local_names.ru : city.name;
    const id = makeId();
    const citiesList = this.state.citiesList;
    if (!citiesList.find(item => item.name === name)) {
      citiesList.push({id, name, lat, lon});
      let addedCity = citiesList[citiesList.findIndex(item => item.id === id)];
      localStorage.setItem("citiesList", JSON.stringify(citiesList));
      localStorage.setItem('currentCity', JSON.stringify(addedCity));
      this.setState({
        citiesList: citiesList,
        currentCity: addedCity
      });
    } else {
      return
    }
  }

  onFlip = () => {
    this.setState({flipped: !this.state.flipped});
  }

  onSelectCity = (city) => {
    localStorage.setItem('currentCity', JSON.stringify(city));
    this.setState({currentCity: city});
  }

  onSelectLang = () => {
    this.setState({currentLang: this.state.currentLang === 'en' ? "ru" : "en"});
    console.log(this.state.currentLang);
  }

  getLocation = () => {
    getLocation(this.state.currentLang)
      .then(data => {
        const id = makeId();
        const {city, lon, lat} = data;
        localStorage.setItem("currentLocation", JSON.stringify({id: id, name: city, lon: lon, lat: lat}));
      })
      .then(() => this.setState({
        currentCity: localStorage.getItem("currentCity") !== null ? getLocalStorage("currentCity", {}) : getLocalStorage("currentLocation", {})
      }))

    
  }

  onDelete = (id, citiesList) => {

    const index = citiesList.findIndex(elem => elem.id === id);

    const newArr = citiesList.slice(0, index).concat(citiesList.slice(index + 1));

    localStorage.setItem("citiesList", JSON.stringify(newArr));

    this.setState({
      citiesList: newArr
    });

    if (this.state.currentCity.id === id) {
      localStorage.removeItem('currentCity');
      this.setState({currentCity: getLocalStorage("currentLocation", {})});
    }

  }

  componentDidMount() {
    this.getLocation();
  }

  render() {
    return (
      <div className={`panel ${this.state.flipped ? 'flip' : ''}`}>
        <div className='panel-front'>
          <FrontSide 
            onClick={this.onFlip}
            currentLang={this.state.currentLang}
            currentCity={this.state.currentCity}
            units = 'metric'/>
        </div>
        <div className='panel-back'>
          <BackSide
            citiesList={this.state.citiesList}
            onClick={this.onFlip}
            onClickLang={this.onSelectLang}
            currentCity={this.state.currentCity}
            onSelect={this.onSelectCity}
            onDelete={this.onDelete}
            onAddCity={this.onAddCity}
            getLocalStorage={getLocalStorage}
          />
        </div>
      </div>
    );
  }
}

export default App;
