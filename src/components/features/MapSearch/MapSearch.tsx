import { useEffect, useRef, useState } from 'react'
import styles from './MapSearch.module.scss'
import SearchBar from '@/components/common/SearchBar/SearchBar'
import Container from '@/components/atoms/Container/Container'
import { MapProps } from '@/pages/Post/Post'

declare const window: typeof globalThis & {
  kakao: any
}

interface MapSearchProps {
  initialLatitude?: number
  initialLongitude?: number
  initialValue?: string
  setValue: (selectedValue: any) => void
}

const MapSearch = ({
  initialLatitude,
  initialLongitude,
  initialValue,
  setValue,
}: MapSearchProps) => {
  const markersRef = useRef<any[]>([])
  const mapRef = useRef<any>(null)
  const menuRef = useRef<HTMLDivElement>(null) // menuDiv에 대한 참조
  const [keyword, setKeyword] = useState('')
  const [selectedPlace, setSelectedPlace] = useState('')
  const [places, setPlaces] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`
    document.head.appendChild(script)

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.querySelector(`.${styles.map}`)

        if (initialLatitude && initialLongitude) {
          const options = {
            center: new window.kakao.maps.LatLng(Number(initialLatitude), Number(initialLongitude)),
            level: 3,
            scrollwheel: false, //스크롤줌 비활성화
          }

          // 지도 객체 생성
          const map = new window.kakao.maps.Map(container, options)
          mapRef.current = map // 지도 객체를 ref에 저장

          // 마커 생성 및 지도에 추가
          const markerPosition = new window.kakao.maps.LatLng(
            Number(initialLatitude),
            Number(initialLongitude),
          )
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          })
          marker.setMap(map) // 마커를 지도에 표시
        } else {
          const options = {
            center: new window.kakao.maps.LatLng(35.2314079, 129.0843855),
            level: 3,
          }
          mapRef.current = new window.kakao.maps.Map(container, options)
        }
      })
    }
  }, [initialLatitude, initialLongitude])

  useEffect(() => {
    if (initialValue) {
      setSelectedPlace(initialValue)
    }
  }, [initialValue])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const searchPlaces = () => {
    if (!keyword.trim()) {
      setIsActive(false)
      alert('키워드를 입력해주세요!')
      return
    }

    if (!window.kakao || !window.kakao.maps || !mapRef.current) {
      setIsActive(false)
      alert('맵이 아직 로드되지 않았습니다.')
      return
    }

    const ps = new window.kakao.maps.services.Places()
    const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 })
    var searchOptions = {
      location: new window.kakao.maps.LatLng(35.2314079, 129.0843855),
      radius: 3000,
      sort: window.kakao.maps.services.SortBy.DISTANCE,
    }
    removeMarkers()
    // 사용자가 입력한 키워드를 바탕으로 장소를 검색
    ps.keywordSearch(
      keyword,
      (data: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          removeMarkers()
          setPlaces(data) //검색 결과 데이터를 상태로 저장
          setIsOpen(true) //검색 결과 모달창 열기
          setIsActive(true)
          const bounds = new window.kakao.maps.LatLngBounds() //지도에서 모든 결과를 보기 위해 경계 설정
          data.forEach((place: any) => {
            const marker = displayMarker(place, infowindow) //장소 데이터를 기반으로 마커를 생성 및 표시
            bounds.extend(new window.kakao.maps.LatLng(place.y, place.x))
            markersRef.current.push(marker)
            initialLatitude = undefined
            initialLongitude = undefined
          })
          mapRef.current.setBounds(bounds)
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
          setIsActive(false)

          alert('검색 결과가 존재하지 않습니다.')
        } else if (status === window.kakao.maps.services.Status.ERROR) {
          setIsActive(false)
          alert('검색 결과 중 오류가 발생했습니다.')
        }
      },
      searchOptions,
    )
  }

  const displayMarker = (place: any, infowindow: any) => {
    const marker = new window.kakao.maps.Marker({
      map: mapRef.current,
      position: new window.kakao.maps.LatLng(place.y, place.x),
    })

    window.kakao.maps.event.addListener(marker, 'click', () => {
      infowindow.setContent(`<div>${place.place_name}</div>`)
      infowindow.open(mapRef.current, marker)
    })

    return marker
  }

  const removeMarkers = () => {
    markersRef.current.forEach((marker) => marker.setMap(null))
    markersRef.current = []
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const onPlaceClick = (place: any) => {
    const newSelectedPlace = {
      name: place.place_name,
      latitude: parseFloat(place.y),
      longitude: parseFloat(place.x),
    }

    setSelectedPlace(place.place_name)
    setValue(newSelectedPlace)
    const moveLatLon = new window.kakao.maps.LatLng(place.y, place.x)
    mapRef.current.panTo(moveLatLon)
  }

  return (
    <Container direction="column" gap={14} style={{ width: '100%' }}>
      <div className={styles.mapSection}>
        <div className={styles.mapWrap}>
          <div className={styles.map} />
        </div>
      </div>
      <Container gap={14} justify="space-between" style={{ width: '100%' }}>
        <Container direction="column" ref={menuRef}>
          <SearchBar
            placeholder="장소를 검색해주세요"
            value={keyword}
            radius={8}
            width="200px"
            isOpen={isOpen}
            toggleActive={isActive}
            onChange={handleInputChange}
            onSubmit={searchPlaces}
            onToggle={() => setIsOpen((prev) => !prev)}
          />
          {isOpen ? (
            <div className={styles.menuDiv}>
              <div className={styles.menuWrap}>
                <ul className={`${styles.placesList} ${isOpen ? styles.active : ''}`}>
                  {places.map((place, index) => (
                    <div key={index}>
                      <li
                        className={`${styles.listItem} ${
                          place.place_name === selectedPlace ? styles.selected : ''
                        }`}
                        onClick={() => onPlaceClick(place)}
                      >
                        <h5 className={styles.placeName}>{place.place_name}</h5>
                        <p className={styles.address}>
                          {place.road_address_name || place.address_name}
                        </p>
                      </li>
                      {index < places.length - 1 && <hr className={styles.separator} />}
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </Container>
        <div className={`${styles.selectedPlaceBox} ${selectedPlace ? '' : styles.notSetted}`}>
          {selectedPlace ? selectedPlace : '장소를 검색하고 선택해주세요'}
        </div>
      </Container>
    </Container>
  )
}

export default MapSearch
