import 'normalize.css';
import "./sass/main.sass";

// http://api.open-notify.org/iss-now.json
// https://api.wheretheiss.at/v1/satellites/25544


import styles from './modules/mapStyle'
import render from './modules/render'
import { getInfo, getPos } from './modules/api'


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
      mapTypeId: google.maps.MapTypeId.SATELLITE,
      // styles
    });

    function line() {
      const marker = new google.maps.Polyline({
        path,
        strokeColor: '#fff',
        strokeOpacity: 1,
        strokeWeight: 4
      });
      return marker.setMap(map);
    }

    // setInterval(() => {
    //   getPos().then(res => {
    //     const position = new google.maps.LatLng(res.latitude, res.longitude)
    //     path.push(position)
    //     line()
    //     path.shift()
    //   })
    // }, 500)
  })
}



render()
