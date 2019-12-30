import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Transition } from 'react-transition-group';

import OmikujiBox from '../components/OmikujiBox';

const SceneContainer = styled.div`
    margin: 0;
    padding: 0;
    touch-action: none;
    height: 100%;
    width: 100%;
    user-select: none;
    position: relative;
    overflow: hidden;

    transition: 0.5s;
`;

const OmikujiShake = keyframes`
    0% {transform: translateY(-10px); };
    50% { transform: translateY(10px); };
    100% {transform: translateY(-10px);};
`;

const OmikujiContainer = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    
    padding: auto;
    text-align: center;
`;

const OmikujiGuide = styled.div`
    /* guide */
    animation: ${({ show }) => show ? css`${OmikujiShake} infinite 0.5s linear` : css`none`} ;
    width: 168px;
    height: 300px;
    margin: auto;
    &:hover {
        cursor: grab;
    };

    &:after {
        position: absolute;
        z-index: 100;
        top: 130px;
        right: -30px;
        width: 75px;
        height: 75px;
        pointer-events: none;
        background-image: url(/img/cursor.png);
        background-size: cover;
        content: ' ';
        opacity: ${({ show }) => show ? '1.0' : '0.0'};
    }
`;

const EffectContainer = styled.div`
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    pointer-events: none;
    z-index: 1000;
    transition: 1.0s;
    opacity: ${({ state }) => (state === 'entered' ? '1.0' : '0.0')};
    background-color: #fff;
`;

const SkipButton = styled.button`
    position: absolute;
    top: 5%;
    right: 5%;
    height: 30px;
    width: 100px;
    border-radius: 15px;
    border: 1px solid #fff;
    font-weight: bold;
    font-size: 15px;
    background-color: #fff;
`;

const getEvent = (e) => e.type.match(/mouse.+/) ? e.nativeEvent : e.changedTouches[0];



const Omikuji = ({ setScene }) => {
    const [showGuide, setShowGuide] = React.useState(true);
    const [grab, setGrab] = React.useState(false);
    const [mouseY, setMouseY] = React.useState(null);
    const [t, setT] = React.useState(0);
    const [y, setY] = React.useState(100);
    const [yv, setYv] = React.useState(0);
    const [hamidashi, setHamidashi] = React.useState(-150.0);
    const [animate, setAnimate] = React.useState(false);
    const [skip, setSkip] = React.useState(false);

    const handleMouseDown = React.useCallback((rawEvent) => {
        setGrab(true);
        setShowGuide(false);
        rawEvent.preventDefault();

        const event = getEvent(rawEvent);
        setMouseY(event.clientY);
    }, []);

    const handleMouseUp = React.useCallback((_rawEvent) => {
        setGrab(false);
    }, []);

    const handleMouseMove = React.useCallback((rawEvent) => {
        if (!grab) return;

        const event = getEvent(rawEvent);
        //rawEvent.preventDefault();

        const now = Date.now();
        const newMouseY = event.clientY;
        const deltaT = now - t;
        const deltaY = newMouseY - mouseY;

        const k = 250.0;
        const v = deltaY / deltaT;
        const a = k * (yv - v) / deltaT;

        setMouseY(newMouseY);
        setT(now);
        //setYa(a);
        setYv(v);
        setY(y + deltaY);

        if (v > 0 && a > 0) setHamidashi(Math.min(hamidashi + a / 1.0, 150));
    }, [grab, yv, t, y, mouseY, hamidashi]);

    const onSetSkip = React.useCallback(() => {
        setSkip(true);
    }, []);

    React.useEffect(() => {
        if (hamidashi > 149.9 || skip) {
            setGrab(false);
            setTimeout(() => {
                setAnimate(true);
            }, 300);

            setTimeout(() => {
                setScene('result');
            }, 1900);
        }
    }, [hamidashi, setScene, skip]);

    return (
        <SceneContainer
            onMouseUp={handleMouseUp}
            onTouchEnd={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
            onTouchLeave={handleMouseUp}
        >
            <OmikujiContainer style={{ top: y }}>
                <OmikujiGuide show={showGuide}>
                    <OmikujiBox onMouseDown={handleMouseDown} onTouchStart={handleMouseDown} grab={grab} length={Math.max(hamidashi, 0)} />
                </OmikujiGuide>
            </OmikujiContainer>
            <SkipButton onClick={onSetSkip}>Skip</SkipButton>
            <Transition in={animate} timeout={500}>
                {(state) =>
                    <EffectContainer state={state} />
                }
            </Transition>
        </SceneContainer>
    );
}

export default Omikuji;
