import React from 'react';

const WetherIcon =  ({icon}) => {
    return <img src={`/icons/${icon}.svg`} alt="weather icon" width='120px'/>;
};

export default WetherIcon;