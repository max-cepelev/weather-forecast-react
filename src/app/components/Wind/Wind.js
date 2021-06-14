import "./wind.scss";

const Wind = (props) => {
    function getDirection(angle) {
        const directions = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'];
        return directions[Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8];
    }
    return (
        <div className={props.classes}>
            <p>{getDirection(props.deg)}</p>
            {/* <img src="icons/arrow.svg" alt="compass" style={{transform: `rotate(${props.deg}deg)`, height: props.arrowHeight}}/> */}
            <div>{`${parseInt(props.speed)} м/с`}</div>
        </div>  
    )
}

export default Wind;