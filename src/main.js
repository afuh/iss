/*global google, window, document*/

/* APIs */
// http://api.open-notify.org/iss-now.json
// https://api.wheretheiss.at/v1/satellites/25544

import 'normalize.css';
import "./main.sass";

import styles from './modules/mapStyle'
import showInfo from './modules/showInfo'
import { getPos } from './modules/api'


window.onload = function initMap() {
  getPos().then(res => {
    const path = []
    const position = new google.maps.LatLng(res.latitude, res.longitude)
    path.push(position)

    const map = new google.maps.Map(document.getElementById("map"), {
      center: position,
      zoom: 4,
      scrollwheel: false,
      streetViewControl: false,
      fullscreenControl: true,
      styles
    });

    function line() {
      const marker = new google.maps.Polyline({
        path,
        strokeColor: '#fff',
        strokeOpacity: 1,
        strokeWeight: 5
      });
      return marker.setMap(map);
    }

    setInterval(() => {
      getPos().then(res => {
        const position = new google.maps.LatLng(res.latitude, res.longitude)
        path.push(position)
        line()
        path.shift()
      })
    }, 500)

    showInfo()
    setInterval(showInfo, 1100)
  })
}
