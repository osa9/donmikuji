import React from 'react';
import styled from 'styled-components';

const StartMenu = ({ setScene }) => {
    return <button onClick={() => setScene('omikuji')}>Start</button>
}

export default StartMenu;