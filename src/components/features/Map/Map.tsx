import { useEffect, useRef, useState } from 'react'
import styles from './Map.module.scss'
import SearchBar from '@/components/common/SearchBar/SearchBar'
import Container from '@/components/atoms/Container/Container'

declare const window: typeof globalThis & {
  kakao: any
}

interface MapProps {
  setValue: (selectedValue: string) => void
}

const Map = ({ setValue }: MapProps) => {
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
        const options = {
          center: new window.kakao.maps.LatLng(35.2314079, 129.0843855),
          level: 3,
        }

        mapRef.current = new window.kakao.maps.Map(container, options)
      })
    }
  }, [])

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

    ps.keywordSearch(
      keyword,
      (data: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          removeMarkers()
          setPlaces(data)
          setIsOpen(true)
          setIsActive(true)
          const bounds = new window.kakao.maps.LatLngBounds()
          data.forEach((place: any) => {
            const marker = displayMarker(place, infowindow)
            bounds.extend(new window.kakao.maps.LatLng(place.y, place.x))
            markersRef.current.push(marker)
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
      setSelectedPlace(place.place_name)
      setValue(place.place_name)
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
    setSelectedPlace(place.place_name)
    setValue(place.place_name)
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

export default Map
