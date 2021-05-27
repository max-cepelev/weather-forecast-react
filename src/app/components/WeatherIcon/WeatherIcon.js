import React from 'react';

const WetherIcon =  ({icon, width}) => {
    return <img src={`/icons/weather/${icon}.svg`} alt="weather icon" width={width}/>;
};

export default WetherIcon;