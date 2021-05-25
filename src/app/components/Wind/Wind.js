import "./wind.scss";

const Wind = (props) => {
    return (
        <div className={props.classes}>
            <img src="icons/arrow.svg" alt="compass" style={{transform: `rotate(${props.deg}deg)`, height: props.arrowHeight}}/>
            <div>{`${parseInt(props.speed)} м/с`}</div>
        </div>  
    )
}

export default Wind;