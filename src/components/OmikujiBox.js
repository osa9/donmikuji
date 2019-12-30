import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
    margin: auto;
    width: 168px;
    height: 300px;
    background-image: ${({ stage }) => `url(/img/kujibox${stage}.png)`};
    background-size: contain;
`;

const Bar = styled.div`
    height: ${({ length }) => length}px;
    width: 10px;
    margin: auto;
    border-left: 1px solid #b96a38;
    border-right: 2px solid #b62;
    background-color: #c3713e;
`;

const OmikujiBox = ({ onMouseDown, grab, length }) => {
    const stage = length > 0 ? (length > 100 ? 3 : 2) : 1;
    return <>
        <Box grab={grab} onMouseDown={onMouseDown} onTouchStart={onMouseDown} />
        <Bar length={length} stage={stage} />
    </>
}

export default OmikujiBox;