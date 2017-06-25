import { getAll } from './api'

const render = () => {
  getAll().then(({ info, position, ppl }) => {

    const el = document.querySelector("div.info");
    const humans = ppl.map(human => `<li class="name">${human.name}</li>`)
    .join(" ")

    el.innerHTML = `
      <ul class="info-list">
        <li class="lat">
          <span>Latitude: </span>
          <span>${ Number(position.latitude).toFixed(2) }</span>
        </li>
        <li class="lon">
          <span>Longitude: </span>
          <span>${ Number(position.longitude).toFixed(2) }</span>
        </li>
        <li class="altitude">
          <span>Altitude: </span>
          <span>${ Math.round(info.altitude) } Kms</span>
        </li>
        <li class="speed">
          <span>Speed: </span>
          <span>${  Math.round(info.velocity) } Km/h </span>
        </li>
        <li class="visibility">
          <span>Visibility: </span>
          <span>${info.visibility} </span>
        </li>
      </ul>
      <div class="people">
        <span> There are ${ppl.length} humans in space </span>
        <ul> ${humans} </ul>
      </div>
    `
  })
}

export default render
