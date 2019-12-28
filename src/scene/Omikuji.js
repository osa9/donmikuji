import React from 'react';
import styled from 'styled-components';


import OmikujiBox from '../components/OmikujiBox';

const OmikujiContainer = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: ${({ y }) => y}px;
    padding: auto;
    text-align: center;
`;

const SceneContainer = styled.div`
    border: 1px solid red;
    min-height: 100vh;
    min-width: 100vw;
`;

const Omikuji = ({ setScene }) => {
    const ypos = 100;
    const xpos = 100;
    const [grab, setGrab] = React.useState(false);
    const [mouseY, setMouseY] = React.useState(100);
    const [lastT, setLastT] = React.useState(0);
    const [yv, setYv] = React.useState(0);
    const [ya, setYa] = React.useState(0);
    const [hamidashi, setHamidashi] = React.useState(0.0);

    const handleMouseDown = React.useCallback((e) => {
        setGrab(true);
    }, []);

    const handleMouseUp = React.useCallback((e) => {
        setGrab(false);
    }, []);

    const handleMouseMove = React.useCallback((e) => {
        if (!grab) return;
        const scale = 12.0;
        const now = Date.now();
        const deltaT = now - lastT;

        const v = (e.nativeEvent.clientY - mouseY) / deltaT * scale;
        const a = (yv - v) / deltaT * scale;

        setMouseY(e.nativeEvent.clientY);
        setYa(a);
        setYv(v);
        setLastT(now);
        if (v > 0 && a > 0) setHamidashi(Math.min(hamidashi + a / 1.0, 150));
    }, [grab, yv, lastT, mouseY, hamidashi]);

    React.useEffect(() => {
        if (hamidashi > 149.9) {
            setScene('result');
        }
    }, [hamidashi, setScene]);

    return (
        <SceneContainer onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}>
            <OmikujiContainer y={mouseY}>
                <OmikujiBox onMouseDown={handleMouseDown} grab={grab} length={hamidashi} />
            </OmikujiContainer>
        </SceneContainer>
    );
}

export default Omikuji;
