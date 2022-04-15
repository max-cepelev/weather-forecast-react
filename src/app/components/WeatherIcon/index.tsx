import React from "react";
interface Props {
  icon: string;
  width: string;
}
const WetherIcon = ({ icon, width }: Props) => {
  return (
    <img src={`/icons/weather/${icon}.svg`} alt="weather icon" width={width} />
  );
};

export default WetherIcon;
