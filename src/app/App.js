import { Component } from 'react';
import FrontSide from './components/FrontSide';
import BackSide from './components/BackSide';
import './panel.css';
// import cities from './components/city.list.min.json';
import {getLocation} from './components/services/api';

const makeId = () => {
  let ID = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for ( var i = 0; i < 12; i++ ) {
    ID += characters.charAt(Math.floor(Math.random() * 36));
  }
  return ID;
}
class App extends Component {

  state = {
    flipped: false,
    currentLang: 'ru',
    currentCity: JSON.parse(localStorage.getItem("currentLocation")),
    citiesList: JSON.parse(localStorage.getItem("citiesList")) !== null ? JSON.parse(localStorage.getItem("citiesList")) : []
  };

  onAddCity = (city) => {
    const {lat, lon, local_names} = city;
    const name = local_names.ru;
    const id = makeId();
    const citiesList = this.state.citiesList;
    citiesList.push({id, lat, lon, name});
    this.setState({citiesList: citiesList})
    localStorage.setItem("citiesList", JSON.stringify(citiesList));
  }

  onFlip = () => {
    this.setState({flipped: !this.state.flipped});
  }

  onSelectCity = (city) => {
    this.setState({currentCity: city});
  }

  onSelectLang = () => {
    this.setState({currentLang: this.state.currentLang === 'en' ? "ru" : "en"});
    console.log(this.state.currentLang);
  }

  onGetLocation = () => {
    getLocation(this.state.currentLang)
      .then(data => {
        localStorage.setItem("currentLocation", JSON.stringify({name: data.city, lon: data.lon, lat: data.lat}));
      })
  }

  render() {
    this.onGetLocation();
    console.log(this.state.currentCity);
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
            onAddCity={this.onAddCity}
          />
        </div>
      </div>
    );
  }
}

export default App;
