import { Component } from 'react';
import FrontSide from './components/FrontSide';
// import BackSide from './components/BackSide';
import './panel.css';
// import cities from './components/city.list.min.json';
import {getResource} from './components/services/api';



class App extends Component {

  state = {
    flipped: false,
    currentLang: 'ru',
    currentCity: JSON.parse(localStorage.getItem("currentLocation"))
  };


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
    getResource(`http://ip-api.com/json/?lang=${this.state.currentLang}&fields=regionName,city,lat,lon`)
      .then(data => {
        localStorage.setItem("currentLocation", JSON.stringify({city: data.city, lon: data.lon, lat: data.lat}));
      })
  }

  render() {
    this.onGetLocation()
    console.log(this.state.currentCity)
    return (
      <div className={`panel ${this.state.flipped ? 'flip' : ''}`}>
        <div className='panel-front'>
          <FrontSide 
            onClick={this.onFlip}
            currentLang={this.state.currentLang}
            currentCity={this.state.currentCity}
            units = 'metric'/>
        </div>
        {/* <div className='panel-back'>
          <BackSide
            onClick={this.onFlip}
            onClickLang={this.onSelectLang}
            currentCity={this.state.currentCity}
            onSelect={this.onSelectCity}
          />
        </div> */}
      </div>
    );
  }
}

export default App;
