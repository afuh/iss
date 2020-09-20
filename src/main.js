/*global google*/
import 'regenerator-runtime/runtime'

import './index.css'
import styles from './modules/mapStyle'
import renderInfoBox from './modules/renderInfo'

const REFRESH_TIME = 5000
const ROOT = document.getElementById('map')
const COLOR = '#fff'

const fetchApi = () => fetch('/api').then(res => res.json())
const getLatLng = ({ info }) => new google.maps.LatLng(info.latitude, info.longitude)

const init = ({ center }) => {
  const path = [center]

  return {
    circle(map, data) {
      const drawCircle = new google.maps.Circle({
        strokeColor: COLOR,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillOpacity: 1,
        fillColor: COLOR,
        center,
        radius: 20 * 1000
      })

      drawCircle.setMap(map)
      renderInfoBox(data)
    },
    line(map, data) {
      path.push(getLatLng({ info: data.info }))

      const drawLine = new google.maps.Polyline({
        path,
        strokeColor: COLOR,
        strokeOpacity: 1,
        strokeWeight: 5
      })

      drawLine.setMap(map)
      renderInfoBox(data)
      path.shift()
    }
  }
}

window.onload = async () => {
  const data = await fetchApi()
  const center = getLatLng({ info: data.info })
  const render = init({ center })

  const map = new google.maps.Map(ROOT, {
    center,
    zoom: 4,
    scrollwheel: false,
    streetViewControl: false,
    fullscreenControl: true,
    styles: styles[data.info.visibility]
  })

  render.circle(map, data)

  setInterval(async () => {
    const data = await fetchApi()
    render.line(map, data)
  }, REFRESH_TIME)
}
