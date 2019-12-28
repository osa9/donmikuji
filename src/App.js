import React from 'react';
import './App.css';

import StartMenu from './scene/StartMenu';
import Omikuji from './scene/Omikuji';
import Result from './scene/Result';

const App = () => {
  const [scene, setScene] = React.useState('start');

  return (
    <div className="App">
      <div className="content">
        {scene === 'start' && <StartMenu setScene={setScene} />}
        {scene === 'omikuji' && <Omikuji setScene={setScene} />}
        {scene === 'result' && <Result />}
      </div>
    </div>
  );
}

export default App;
