import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
    margin: auto;
    width: 150px;
    height: 300px;
    background-color: ${({ grab }) => grab ? 'orange' : 'blue'};
    background-image: url(/img/kujibox.jpg);
    background-size: cover;
`;

const Bar = styled.div`
    height: ${({ length }) => length}px;
    width: 10px;
    margin: auto;
    background-color: orange;
`;

const OmikujiBox = ({ onMouseDown, grab, length }) =>
    <>
        <Box grab={grab} onMouseDown={onMouseDown} />
        <Bar length={length} />
    </>


export default OmikujiBox;