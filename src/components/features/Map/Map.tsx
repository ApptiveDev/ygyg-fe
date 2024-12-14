import { useEffect, useRef, useState } from 'react'
import styles from './Map.module.scss'
import InputText from '@/components/atoms/InputText/InputText'

declare const window: typeof globalThis & {
  kakao: any
}

const Map = (props: any) => {
  const markersRef = useRef<any[]>([])
  const mapRef = useRef<any>(null)
  const [keyword, setKeyword] = useState('')

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

  const searchPlaces = () => {
    if (!keyword.trim()) {
      alert('키워드를 입력해주세요!')
      return
    }

    if (!window.kakao || !window.kakao.maps || !mapRef.current) {
      alert('맵이 아직 로드되지 않았습니다.')
      return
    }

    const ps = new window.kakao.maps.services.Places()
    const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 })

    ps.keywordSearch(keyword, (data: any, status: any, pagination: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        removeMarkers()
        displayPlaces(data)

        const bounds = new window.kakao.maps.LatLngBounds()
        data.forEach((place: any) => {
          const marker = displayMarker(place, infowindow)
          bounds.extend(new window.kakao.maps.LatLng(place.y, place.x))
          markersRef.current.push(marker)
        })
        mapRef.current.setBounds(bounds)
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.')
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.')
      }
    })
  }

  const displayMarker = (place: any, infowindow: any) => {
    const marker = new window.kakao.maps.Marker({
      map: mapRef.current,
      position: new window.kakao.maps.LatLng(place.y, place.x),
    })

    window.kakao.maps.event.addListener(marker, 'click', () => {
      infowindow.setContent(`<div>${place.place_name}</div>`)
      infowindow.open(mapRef.current, marker)
      const moveLatLon = new window.kakao.maps.LatLng(place.y, place.x)
      mapRef.current.panTo(moveLatLon)
    })

    return marker
  }

  const displayPlaces = (places: any) => {
    const listEl = document.querySelector(`.${styles.placesList}`)
    const fragment = document.createDocumentFragment()
    removeAllChildNodes(listEl)

    places.forEach((place: any, index: number) => {
      const itemEl = getListItem(index, place)
      fragment.appendChild(itemEl)
    })

    listEl?.appendChild(fragment)
  }

  const getListItem = (index: number, places: any) => {
    const el = document.createElement('li')

    let itemStr =
      '<span class="markerbg marker_' +
      (index + 1) +
      '"></span>' +
      '<div class="info">' +
      '   <h5>' +
      places.place_name +
      '</h5>'

    if (places.road_address_name) {
      itemStr +=
        '    <span>' +
        places.road_address_name +
        '</span>' +
        '   <span class="jibun gray">' +
        `<img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png">
        </img>` +
        places.address_name +
        '</span>'
    } else {
      itemStr += '    <span>' + places.address_name + '</span>'
    }

    el.innerHTML = itemStr
    el.className = 'item'

    return el
  }

  const removeAllChildNodes = (el: any) => {
    while (el?.firstChild) {
      el.removeChild(el.firstChild)
    }
  }

  const removeMarkers = () => {
    markersRef.current.forEach((marker) => marker.setMap(null))
    markersRef.current = []
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  return (
    <div className={styles.mapSection}>
      <div className={styles.mapWrap}>
        <div className={styles.map}></div>
        <div className={styles.menuDiv}>
          <div className={styles.menuWrap}>
            <div className={styles.form}>
              <InputText
                placeholder="장소를 검색해주세요."
                value={keyword}
                width="100%"
                onChange={handleInputChange}
              />
              <button className={styles.submitBtn} onClick={searchPlaces}>
                검색
              </button>
            </div>
            <ul className={styles.placesList}></ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Map
