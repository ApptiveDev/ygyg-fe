import { useEffect, useRef } from 'react'
import styles from './Map.module.scss'
import Container from '@/components/atoms/Container/Container'

declare const window: typeof globalThis & {
  kakao: any
}

interface MapProps {
  latitude: string
  longitude: string
}

export const Map = ({ latitude, longitude }: MapProps) => {
  const mapRef = useRef<any>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`
    document.head.appendChild(script)

    script.onload = () => {
      window.kakao.maps.load(() => {
        // 지도 컨테이너
        const container = document.querySelector(`.${styles.map}`)

        // 저장된 위도 및 경도를 옵션에 추가 함으로서 지도에 표시
        const options = {
          center: new window.kakao.maps.LatLng(Number(latitude), Number(longitude)),
          level: 3,
          scrollwheel: false, //스크롤줌 비활성화
        }

        // 지도 객체 생성
        const map = new window.kakao.maps.Map(container, options)
        mapRef.current = map // 지도 객체를 ref에 저장

        // 마커 생성 및 지도에 추가
        const markerPosition = new window.kakao.maps.LatLng(Number(latitude), Number(longitude))
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        })
        marker.setMap(map) // 마커를 지도에 표시
      })
    }
  }, [latitude, longitude])

  return (
    <Container direction="column" gap={14} style={{ width: '100%' }}>
      <div className={styles.mapSection}>
        <div className={styles.mapWrap}>
          <div className={styles.map} />
        </div>
      </div>
    </Container>
  )
}
