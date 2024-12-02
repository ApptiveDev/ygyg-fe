import { useEffect, useState } from 'react'
import styles from './Map.module.scss'

declare const window: typeof globalThis & {
  kakao: any
}

const Map = (props: any) => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`
    document.head.appendChild(script)

    script.onload = () => {
      window.kakao.maps.load(() => {
        let markers: any[] = []

        const container = document.querySelector(`.${styles.map}`)
        const options = {
          center: new window.kakao.maps.LatLng(35.2314079, 129.0843855),
          level: 3,
        }

        const map = new window.kakao.maps.Map(container, options)

        const markerPosition = new window.kakao.maps.LatLng(35.2314079, 129.0843855)

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        })

        marker.setMap(map)

        const ps = new window.kakao.maps.services.Places()

        const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 })

        const searchForm = document.querySelector(`.${styles.submitBtn}`) as HTMLButtonElement
        searchForm?.addEventListener('click', function (e) {
          e.preventDefault()
          searchPlaces()
        })

        const searchPlaces = () => {
          const keyword = (document.querySelector(`.${styles.keyword}`) as HTMLInputElement).value

          if (!keyword.replace(/^\s+|\s+$/g, '')) {
            alert('키워드를 입력해주세요!')
            return false
          }

          ps.keywordSearch(keyword, placesSearchCB)
        }

        function placesSearchCB(data: any, status: any, pagination: any) {
          if (status === window.kakao.maps.services.Status.OK) {
            displayPlaces(data)

            displayPagination(pagination)

            const bounds = new window.kakao.maps.LatLngBounds()
            for (let i = 0; i < data.length; i++) {
              displayMarker(data[i])
              bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x))
            }

            map.setBounds(bounds)
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.')
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.')
          }
        }

        const displayMarker = (place: any) => {
          const marker = new window.kakao.maps.Marker({
            map,
            position: new window.kakao.maps.LatLng(place.y, place.x),
          })

          window.kakao.maps.event.addListener(marker, 'click', () => {
            infowindow.setContent(`<div>${place.place_name}</div>`)
            infowindow.open(map, marker)
            const moveLatLon = new window.kakao.maps.LatLng(place.y, place.x)
            map.panTo(moveLatLon)
          })
        }

        const displayPlaces = (places: any) => {
          const listEl = document.querySelector(`.${styles.placesList}`)
          const menuEl = document.querySelector(`.${styles.menuWrap}`)
          const fragment = document.createDocumentFragment()
          // const bounds = new window.kakao.maps.LatLngBounds();
          removeAllChildNodes(listEl)
          removeMarker()
          for (let i = 0; i < places.length; i++) {
            const placePosition = new window.kakao.maps.LatLng(places[i].y, places[i].x)
            const marker = addMarker(placePosition, i)
            const itemEl = getListItem(i, places[i])
            // bounds.extend(placePosition);
            ;(function (marker, title) {
              window.kakao.maps.event.addListener(marker, 'mouseover', function () {
                displayInfowindow(marker, title)
              })

              window.kakao.maps.event.addListener(marker, 'mouseout', function () {
                infowindow.close()
              })

              itemEl.addEventListener('click', function (e) {
                displayInfowindow(marker, title)
                props.setAddress(places[i])
                map.panTo(placePosition)
              })
            })(marker, places[i].place_name)

            fragment.appendChild(itemEl)
          }
          places.forEach((place: any, index: number) => {
            const itemEl = getListItem(index, place)
            listEl?.appendChild(itemEl)
          })
        }

        const displayPagination = (pagination: any) => {
          const paginationEl = document.querySelector(`.${styles.pagination}`)
          const fragment = document.createDocumentFragment()
          while (paginationEl?.hasChildNodes()) {
            paginationEl.removeChild(paginationEl.lastChild!)
          }

          for (let i = 1; i <= pagination.last; i++) {
            const el = document.createElement('a')
            el.href = '#'
            el.innerHTML = String(i)

            if (i === pagination.current) {
              el.className = 'on'
            } else {
              el.onclick = (function (i) {
                return function () {
                  pagination.gotoPage(i)
                }
              })(i)
            }

            fragment.appendChild(el)
          }
          paginationEl?.appendChild(fragment)
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

        function addMarker(position: any, idx: any) {
          const imageSrc =
            'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png'
          const imageSize = new window.kakao.maps.Size(36, 37)
          const imgOptions = {
            spriteSize: new window.kakao.maps.Size(36, 691),
            spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10),
            offset: new window.kakao.maps.Point(13, 37),
          }

          const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions)

          const marker = new window.kakao.maps.Marker({
            position,
            image: markerImage,
          })

          marker.setMap(map)
          markers.push(marker)

          return marker
        }

        function removeMarker() {
          for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null)
          }
          markers = []
        }

        function displayInfowindow(marker: any, title: any) {
          const content = '<div style={{padding:"5px", zIndex:"1"}}>' + title + '</div>'

          infowindow.setContent(content)
          infowindow.open(map, marker)
        }

        document.querySelector(`.${styles.submitBtn}`)?.addEventListener('click', (e) => {
          e.preventDefault()
          // removeAllChildNodes
          removeMarker()
          searchPlaces()
        })
      })
    }
  }, [])
  const [isOpen, setIsOpen] = useState(true)
  const toggleSearchBar = () => setIsOpen(!isOpen)

  return (
    <div className={styles.mapSection}>
      <div className={`${styles.mapWrap} ${isOpen ? styles.open : styles.closed}`}>
        <div className={styles.map}></div>

        <div className={styles.menuDiv}>
          <div className={`${styles.menuWrap} ${isOpen ? styles.open : ''}`}>
            <div className={styles.form}>
              <input type="text" className={styles.keyword} placeholder="장소이름을 입력하세요" />
              <button className={styles.submitBtn}>검색</button>
            </div>
            <ul className={styles.placesList}></ul>
            <div className={styles.pagination}></div>
          </div>
          <div className={styles.btnDiv}>
            <button className={styles.searchBtn} onClick={toggleSearchBar}>
              {isOpen ? (
                <span className={styles.leftDisplayButton}>◀</span>
              ) : (
                <span className={styles.rightDisplayButton}>▶</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Map
