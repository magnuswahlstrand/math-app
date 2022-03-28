import React from 'react';
import logo from "../logo.svg";

interface InputProps {
    onClick: () => void,
}

const Landing: React.FC<InputProps> = ({onClick}) => {
    return (<>
        <img src={logo} className="App-logo" alt="logo"/>
        <h1>Awesome Math App</h1>

        <a className="App-link" onClick={() => onClick()}>Klicka här för att börja!</a>
    </>)
};

export default Landing;
