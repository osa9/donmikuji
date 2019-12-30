import React from 'react';
import './App.css';
import styled from 'styled-components';

import StartMenu from './scene/StartMenu';
import Omikuji from './scene/Omikuji';
import Result from './scene/Result';

const AppContainer = styled.div`
  position: relative;
  background-color: #89dcff;
  height: 100%;
  margin: 0;
  text-align: center;
  background-image: url(/img/bg.png);
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: center top;
  background-attachment: fixed;

  &:before {
    background-color: rgba(0, 0, 0, ${({ dark }) => dark ? 0.5 : 0.0});
    /* どの範囲に重ねるかを指定 */
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    content: ' ';
  }
`;

const App = () => {
  const [scene, setScene] = React.useState('start');

  return (
    <AppContainer dark={scene !== 'start'}>
      <div className="content">
        {scene === 'start' && <StartMenu setScene={setScene} />}
        {scene === 'omikuji' && <Omikuji setScene={setScene} />}
        {scene === 'result' && <Result />}
      </div>
    </AppContainer>
  );
}

export default App;
