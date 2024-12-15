import { useEffect, useState } from 'react'

type Coord = { latitude: number; longitude: number } | ''

const useGetCurrentLocation = () => {
  const [myLocation, setMyLocation] = useState<Coord>('')

  useEffect(() => {
    // 성공 콜백 함수
    const success = (position: GeolocationPosition) => {
      setMyLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    }

    // 실패 콜백 함수
    const error = () => {
      setMyLocation({ latitude: 35.2314079, longitude: 129.0843855 }) // Default 위치
    }

    // 현재 위치 요청
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error)
    }
  }, [])

  return myLocation // 현재 위치 반환
}

export default useGetCurrentLocation
