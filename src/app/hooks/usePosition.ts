import { useState, useEffect } from 'react'

interface IPosition {
  accuracy: number
  altitude: number | null
  altitudeAccuracy: number | null
  heading: number | null
  latitude: number
  longitude: number
  speed: number | null
  timestamp: EpochTimeStamp
}

const defaultSettings = {
  enableHighAccuracy: false,
  timeout: Infinity,
  maximumAge: 0,
}

export const usePosition = (watch = false, userSettings = {}) => {
  const settings = {
    ...defaultSettings,
    ...userSettings,
  }

  const [position, setPosition] = useState<IPosition | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onChange = ({
    coords,
    timestamp,
  }: {
    coords: GeolocationCoordinates
    timestamp: EpochTimeStamp
  }) => {
    setPosition({
      ...coords,
      timestamp,
    })
  }

  const onError = (error: GeolocationPositionError) => {
    setError(error.message)
  }

  useEffect(() => {
    if (!navigator || !navigator.geolocation) {
      setError('Geolocation is not supported')
      return
    }

    if (watch) {
      const watcher = navigator.geolocation.watchPosition(
        onChange,
        onError,
        settings
      )
      return () => navigator.geolocation.clearWatch(watcher)
    }

    navigator.geolocation.getCurrentPosition(onChange, onError, settings)
  }, [settings.enableHighAccuracy, settings.timeout, settings.maximumAge])

  return { ...position, error }
}
