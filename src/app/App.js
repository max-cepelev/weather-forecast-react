import { Component } from 'react';
import FrontSide from './components/FrontSide/FrontSide';
import BackSide from './components/BackSide/BackSide';
import './panel.css';
import cities from './components/city.list.min.json';

class App extends Component {

  state = {flipped: true, currentCity: cities[0]};

  onFlip = () => {
    this.setState({flipped: !this.state.flipped});
  }


  render() {
    return (
      <div className={`panel ${this.state.flipped ? 'flip' : ''}`}>
        <div className='panel-front'>
          <FrontSide 
            onClick={this.onFlip}
            city={this.state.currentCity}
            lang='en'
            units = 'metric'/>
        </div>
        <div className='panel-back'>
          <BackSide
            cities={cities}
            onClick={this.onFlip}
            currentCity={this.state.currentCity}
          />
        </div>
      </div>
    );
  }
}

export default App;
