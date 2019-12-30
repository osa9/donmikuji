import React from 'react';
import styled from 'styled-components';

const StartButton = styled.button`
    color: #eee;
    background-color: #f0ad4e;
    border: 5px solid #ff9a36;
    border-radius: 2px;
    padding: 20px;
    font-size: 30px;
    font-weight: 700;
    position: absolute;
    bottom: 10%;

    &:hover {
        cursor: pointer;
    }
`;

const StartMenu = ({ setScene }) => {
    return <StartButton onClick={() => setScene('omikuji')}>おみくじをひく</StartButton>
}

export default StartMenu;