import "./panel.scss";
import { useState, useEffect } from "react";
import FrontSide from "./components/FrontSide";
import BackSide from "./components/BackSide";
import { useAppDispatch } from "./hooks/redux";
import { optionsActions } from "./store/reducers/OptionsSlice";
import useGeolocation from "./hooks/useGeolocation";
import { getCityName } from "./services/getData";

function App() {
  const [flip, setFlip] = useState(false);
  const { initLocation, initLocationIsError } = optionsActions;
  const dispatch = useAppDispatch();

  const onFlip = () => {
    setFlip(!flip);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        getCityName(latitude, longitude)
          .then((res) => {
            dispatch(
              initLocation({
                name: res[0].local_names.ru || res[0].name || "Неопределен",
                latitude: res[0].lat,
                longitude: res[0].lon,
              })
            );
          })
          .catch(() => {
            dispatch(initLocationIsError());
          });
      },
      () => {
        dispatch(initLocationIsError());
      }
    );
  }, []);

  return (
    <div className={`panel ${flip ? "flip" : ""}`}>
      <div className="panel-front">
        <FrontSide onClick={onFlip} />
      </div>
      <div className="panel-back">
        <BackSide onClick={onFlip} />
      </div>
    </div>
  );
}

export default App;
