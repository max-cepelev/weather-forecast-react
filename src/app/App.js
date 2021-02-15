import FrontSide from './components/FrontSide/FrontSide';
import moment from 'moment';
import './panel.css';

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
        />
      </div>
      <div className='panel-back'>Panel Back</div>
    </div>
  );
}

export default App;
