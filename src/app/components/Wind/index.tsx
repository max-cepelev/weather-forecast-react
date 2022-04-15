import './wind.scss'

interface Props {
  deg: number
  speed: number
  classes: string
}

const Wind = ({ deg, speed, classes }: Props) => {
  function getDirection(angle: number) {
    const directions = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ']
    return directions[
      Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8
    ]
  }
  return (
    <div className={classes}>
      <p>{getDirection(deg)}</p>
      {/* <img src="icons/arrow.svg" alt="compass" style={{transform: `rotate(${props.deg}deg)`, height: props.arrowHeight}}/> */}
      <div>{speed.toFixed(0)} м/с</div>
    </div>
  )
}

export default Wind
