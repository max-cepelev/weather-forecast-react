import { useEffect, useState } from 'react'

interface IPosition {
  accuracy: number | null
  altitude: number | null
  altitudeAccuracy: number | null
  heading: number | null
  latitude: number | null
  longitude: number | null
  speed: number | null
  timestamp: number
}

export default function useGeolocation() {
  const [state, setState] = useState<IPosition>({
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: Date.now(),
  })
  let mounted = true
  let watchId: number

  const onEvent = ({
    coords,
    timestamp,
  }: {
    coords: GeolocationCoordinates
    timestamp: EpochTimeStamp
  }) => {
    if (mounted) {
      setState({
        accuracy: coords.accuracy,
        altitude: coords.altitude,
        altitudeAccuracy: coords.altitudeAccuracy,
        heading: coords.heading,
        latitude: coords.latitude,
        longitude: coords.longitude,
        speed: coords.speed,
        timestamp: timestamp,
      })
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onEvent)
    watchId = navigator.geolocation.watchPosition(onEvent)

    return () => {
      mounted = false
      navigator.geolocation.clearWatch(watchId)
    }
  }, [0])

  return { ...state }
}
