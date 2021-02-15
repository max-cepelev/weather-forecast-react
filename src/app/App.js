import FrontSide from './components/FrontSide/FrontSide';
import moment from 'moment';
import './panel.css';
import cities from '../city.list.min.json'

function App() {
  return (
    <div className="panel">
      <div className='panel-front'>
        <FrontSide
          date={moment()}
          icon="default"
          temperature={19}
          apparentTemperature={15}
          summary='Sunny'
          currentCityName="Stockholm"
          cities={cities}
        />
      </div>
      <div className='panel-back'>Panel Back</div>
    </div>
  );
}

export default App;
