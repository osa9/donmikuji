import React from 'react';
import styled from 'styled-components';
import boxImg1 from './kujibox1.png';
import boxImg2 from './kujibox2.png';
import boxImg3 from './kujibox3.png';

const Box = styled.div`
    margin: auto;
    width: 168px;
    height: 300px;
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
    const img = length > 0 ? (length > 100 ? boxImg3 : boxImg2) : boxImg1;

    return <>
        <Box
            grab={grab}
            onMouseDown={onMouseDown}
            onTouchStart={onMouseDown}
            style={{ backgroundImage: `url(${img})` }} />
        <Bar length={length} />
    </>
}

export default OmikujiBox;