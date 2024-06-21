import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Calendar from './calendar';
import Timer from './timer';
import './index.css';

const App: React.FC = () => {
  const [showCalendar, setShowCalendar] = useState(true); // State to toggle between Calendar and Timer

  const toggleView = () => {
    setShowCalendar(prevState => !prevState); // Toggle showCalendar state
  };

  return (
    <div className="App">
      <button className='switch' onClick={toggleView}>
        {showCalendar ?'Switch to Calendar': 'Switch to Timer' }
      </button>
   
      {showCalendar ? <Timer /> :<Calendar date={new Date(2024, 5, 21)} /> }
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
