import 'normalize.css';
import "./sass/main.sass";

import axios from 'axios'
import styles from './modules/mapStyle'

function getPos() {
  return axios.get('https://api.wheretheiss.at/v1/satellites/25544')
    .then(res => res.data);
}

initMap()


function initMap() {
  const path = []
  getPos().then(res => {

    const position = new google.maps.LatLng(res.latitude, res.longitude)

    const map = new google.maps.Map(document.getElementById("root"), {
      center: position,
      zoom: 4,
      scrollwheel: false,
      streetViewControl: false,
      fullscreenControl: true,
      // mapTypeId: google.maps.MapTypeId.SATELLITE,
      styles
    });


    setInterval(() => {
      getPos().then(res => {
        const position = new google.maps.LatLng(res.latitude, res.longitude)
        path.push(position)
        const marker = new google.maps.Polyline({
          path,
          geodesic: true,
          strokeColor: '#fff',
          strokeOpacity: 0.7,
          strokeWeight: 8
        });
        marker.setMap(map);
      })
    }, 1000)

  })




}


function marker(map, position) {
  return new google.maps.Marker({
    map,
    position,
  });
}
