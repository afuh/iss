/*global google*/
import 'regenerator-runtime/runtime'

import './index.css'
import styles from './modules/mapStyle'
import renderInfo from './modules/renderInfo'

const REFRESH_TIME = 5000
const fetcher = () => fetch('/api').then(res => res.json())

window.onload = function initMap() {
  fetcher().then(data => {
    const center = new google.maps.LatLng(data.info.latitude, data.info.longitude)
    const path = [center]

    const map = new google.maps.Map(document.getElementById('map'), {
      center,
      zoom: 4,
      scrollwheel: false,
      streetViewControl: false,
      fullscreenControl: true,
      styles: styles[data.info.visibility]
    })

    new google.maps.Circle({
      strokeColor: '#fff',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillOpacity: 1,
      fillColor: '#fff',
      map,
      center,
      radius: 20*1000
    })

    renderInfo(data)

    setInterval(() => {
      fetcher().then(data => {
        path.push(new google.maps.LatLng(data.info.latitude, data.info.longitude))

        const marker = new google.maps.Polyline({
          path,
          strokeColor: '#fff',
          strokeOpacity: 1,
          strokeWeight: 5
        })


        marker.setMap(map)
        renderInfo(data)

        path.shift()
      })

    }, REFRESH_TIME)
  })
}
