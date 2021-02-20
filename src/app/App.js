import { Component } from 'react';
import FrontSide from './components/FrontSide';
import BackSide from './components/BackSide/BackSide';
import './panel.css';
import cities from './components/city.list.min.json';

class App extends Component {


  state = {
    flipped: false, 
    currentCity: localStorage.getItem('cityId') ? cities.find(e=>e.id === +localStorage.getItem('cityId')) : cities[1]};

  onFlip = () => {
    this.setState({flipped: !this.state.flipped});
  }

  onSelectCity = (city) => {
    this.setState({currentCity: city});
  }


  render() {
    return (
      <div className={`panel ${this.state.flipped ? 'flip' : ''}`}>
        <div className='panel-front'>
          <FrontSide 
            onClick={this.onFlip}
            currentCity={this.state.currentCity}
            lang='en'
            units = 'metric'/>
        </div>
        <div className='panel-back'>
          <BackSide
            cities={cities}
            onClick={this.onFlip}
            currentCity={this.state.currentCity}
            onSelect={this.onSelectCity}
          />
        </div>
      </div>
    );
  }
}

export default App;
